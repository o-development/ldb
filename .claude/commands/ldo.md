# LDO (Linked Data Objects) Implementation Skill

Use this skill when implementing LDO in an application. LDO lets you work with RDF/Linked Data as plain JavaScript objects with full TypeScript support.

## What LDO Is

LDO bridges RDF (Resource Description Framework) and JavaScript. You define shapes using ShEx schemas, run a CLI to generate TypeScript types, then read/write linked data as if it were regular JSON. It integrates with Solid (a decentralized data platform) for storing data on user-controlled Pods.

**Core packages:**
- `@ldo/ldo` — core library (raw RDF, no Solid)
- `@ldo/solid-react` — React hooks for Solid Pods (includes auth, resources, data binding)
- `@ldo/cli` — CLI to generate TypeScript from ShEx schemas

---

## Setup

### 1. Install

For a Solid + React app:
```bash
npm i @ldo/solid-react
```

For raw RDF only (no Solid):
```bash
npm i @ldo/ldo
```

### 2. Define ShEx shapes

Create a `shapes/` folder with `.shex` files:

```shex
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

<FoafProfile> {
  foaf:name xsd:string ? ;
  foaf:knows @<FoafProfile> * ;
  foaf:img IRI ? ;
}
```

### 3. Generate types

Add to `package.json`:
```json
"scripts": {
  "build:ldo": "ldo build --input ./shapes --output ./_ldo"
}
```

Run:
```bash
npm run build:ldo
```

This produces `_ldo/foafProfile.shapeTypes.ts` (plus `.typings.ts`, `.schema.ts`, `.context.ts`).

**Only import the `.shapeTypes.ts` file in application code:**
```typescript
import { FoafProfileShapeType } from "./_ldo/foafProfile.shapeTypes";
```

---

## React + Solid Integration

### Provider setup

Wrap your app in `BrowserSolidLdoProvider`:

```tsx
import { BrowserSolidLdoProvider } from "@ldo/solid-react";

export default function App() {
  return (
    <BrowserSolidLdoProvider>
      <YourApp />
    </BrowserSolidLdoProvider>
  );
}
```

### Authentication

```tsx
import { useSolidAuth } from "@ldo/solid-react";

function LoginButton() {
  const { login, logout, session } = useSolidAuth();

  if (session.isLoggedIn) {
    return <button onClick={logout}>Log out ({session.webId})</button>;
  }
  return (
    <button onClick={() => login("https://solidcommunity.net")}>Log in</button>
  );
}
```

`session` fields: `isLoggedIn`, `webId`, `sessionId`, `expirationDate`

---

## Reading Data

### Fetch a resource and extract a typed subject

```tsx
import { useResource, useSubject } from "@ldo/solid-react";
import { FoafProfileShapeType } from "./_ldo/foafProfile.shapeTypes";

function Profile({ webId }: { webId: string }) {
  const profileDoc = useResource(webId);
  const profile = useSubject(FoafProfileShapeType, webId);

  if (profileDoc?.isLoading()) return <p>Loading...</p>;
  if (profileDoc?.isError()) return <p>Error loading profile</p>;

  return <p>{profile?.name}</p>;
}
```

- `useResource(uri)` — fetches the resource and tracks loading/error state
- `useSubject(ShapeType, uri)` — extracts a typed object; re-renders when data changes

### Query multiple subjects

```tsx
import { useMatchSubject } from "@ldo/solid-react";

const posts = useMatchSubject(
  PostShapeType,
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
  "https://schema.org/BlogPosting"
);
// posts is an array of typed Post objects
```

---

## Writing Data

### One-off change

```tsx
import { useLdo, useResource } from "@ldo/solid-react";

function RenameButton({ profileUri }: { profileUri: string }) {
  const { changeData, commitData } = useLdo();
  const resource = useResource(profileUri);
  const profile = useSubject(FoafProfileShapeType, profileUri);

  async function rename() {
    const editable = changeData(profile, resource);
    editable.name = "New Name";
    await commitData(editable);
  }

  return <button onClick={rename}>Rename</button>;
}
```

### Form-friendly change with `useChangeSubject`

Use when you need multiple edits before committing (e.g., a form):

```tsx
import { useChangeSubject, useResource } from "@ldo/solid-react";

function EditPostForm({ postUri }: { postUri: string }) {
  const resource = useResource(postUri);
  const [post, setPost, commitPost] = useChangeSubject(PostShapeType, postUri);

  async function onSubmit(newBody: string) {
    setPost(resource, (draft) => {
      draft.articleBody = newBody;
    });
    const result = await commitPost();
    if (result.isError) console.error(result.message);
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(/* ... */); }}>
      <textarea defaultValue={post?.articleBody} />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Create new data

```tsx
import { useLdo } from "@ldo/solid-react";

const { createData, commitData, getResource } = useLdo();

async function createPost(containerUri: string) {
  const postUri = `${containerUri}post1`;
  const resource = getResource(postUri);
  const post = createData(PostShapeType, postUri, resource);
  post.articleBody = "Hello, world!";
  post["@type"] = [{ "@id": "https://schema.org/BlogPosting" }];
  await commitData(post);
}
```

---

## Solid Containers (Folders)

Containers are folder-like resources on a Solid Pod.

```tsx
import { useResource, useLdo } from "@ldo/solid-react";
import { getRootContainer } from "@ldo/solid-react";

async function setupStorage(webId: string) {
  const { getResource } = useLdo();

  // Get root storage container from WebID
  const root = await getRootContainer(webId);

  // Navigate to a child container
  const postsContainer = root.child("posts/");

  // Create it if it doesn't exist
  await postsContainer.createIfAbsent();

  // Create a child resource
  const newPost = postsContainer.child("post1.ttl");
  await newPost.createChildAndOverwrite();
}
```

### Upload a binary file

```tsx
const imageContainer = storageContainer.child("images/");
await imageContainer.uploadChildAndOverwrite(
  "photo.jpg",
  imageBlob,
  "image/jpeg"
);
```

---

## Raw RDF (No Solid / No React)

```typescript
import { createLdoDataset, parseRdf, toTurtle } from "@ldo/ldo";
import { FoafProfileShapeType } from "./_ldo/foafProfile.shapeTypes";

// Parse existing Turtle data
const turtle = `
  @prefix foaf: <http://xmlns.com/foaf/0.1/> .
  <https://example.com/profile#me> foaf:name "Alice" .
`;
const dataset = await parseRdf(turtle, { baseIRI: "https://example.com/profile" });

// Read a typed object
const profile = dataset
  .usingType(FoafProfileShapeType)
  .fromSubject("https://example.com/profile#me");

console.log(profile.name); // "Alice"

// Mutate and serialize
profile.name = "Alice Updated";
const updatedTurtle = await toTurtle(profile);
```

---

## Transactions (for generating SPARQL PATCH)

```typescript
import { startTransaction, transactionChanges, toSparqlUpdate, commitTransaction } from "@ldo/ldo";

startTransaction(profile);
profile.name = "New Name";
profile.knows?.push({ "@id": "https://example.com/bob#me" });

const changes = transactionChanges(profile);
const sparqlPatch = await toSparqlUpdate(profile); // For PATCH requests
commitTransaction(profile); // Merges changes into the dataset
```

---

## Advanced Patterns

### Language tags

```typescript
import { languageOf } from "@ldo/ldo";

const labels = languageOf(hospitalInfo, "label");
// { '@none': 'Hospital', fr: 'Hôpital' }

labels.zh = "医院"; // Add Chinese
delete labels.fr;   // Remove French

// Set reading preference order
dataset.usingType(ShapeType).setLanguagePreferences("en", "fr", "@none").fromSubject(uri);
```

### Write to a specific named graph

```typescript
import { write } from "@ldo/ldo";
import { namedNode } from "@rdfjs/data-model";

const graphUri = namedNode("https://example.com/graph1");
const writer = write(graphUri).usingCopy(profile);
writer.name = "Alice"; // Written to graph1, not default graph
```

### Change a subject's URI (moves all triples)

```typescript
profile["@id"] = "https://example.com/new-uri#me";
// All existing triples referencing the old URI are updated
```

### Blank nodes

```typescript
person.address = { street: "123 Main St", city: "Anytown" };
// No "@id" → creates a blank node automatically
```

---

## Real-Time Updates (WebSocket)

```tsx
import { useSubscribeToResource } from "@ldo/solid-react";

function LivePost({ uri }: { uri: string }) {
  useSubscribeToResource(uri); // Auto-updates when server pushes changes
  const post = useSubject(PostShapeType, uri);
  return <p>{post?.articleBody}</p>;
}
```

---

## Hook Reference (solid-react)

| Hook | Purpose |
|------|---------|
| `useSolidAuth()` | Login, logout, session |
| `useResource(uri)` | Fetch resource, track loading state |
| `useSubject(ShapeType, uri)` | Read typed object |
| `useMatchSubject(ShapeType, pred, obj)` | Query multiple subjects |
| `useMatchObject(ShapeType, subj, pred)` | Query by object |
| `useLdo()` | Access `dataset`, `createData`, `changeData`, `commitData`, `getResource` |
| `useChangeSubject(ShapeType, uri)` | Form-friendly `[subject, setSubject, commit]` |
| `useChangeDataset(...)` | Full dataset transactions |
| `useSubscribeToResource(uri)` | WebSocket live updates |
| `useRootContainer(webId)` | Get user's storage root |

---

## Common Patterns & Gotchas

- Always call `useResource(uri)` before `useSubject()` — the subject needs the data loaded first.
- `changeData(subject, resource)` returns a **new** mutable copy; the original is read-only.
- `commitData()` sends a SPARQL PATCH (diff-based), not a full PUT — only changed triples are sent.
- For containers, the URI must end with `/` (e.g., `https://pod.example.com/posts/`).
- ShEx shapes use `@id` for subject URIs — always include it in TypeScript types.
- Array properties on LDOs are live views of the dataset; `push()`, `pop()`, splicing all work.
- The `_ldo/` generated folder should be committed to source control but not manually edited.

---

## Documentation

Full docs: https://ldo.js.org  
Guides: https://ldo.js.org/guides/  
API Reference: https://ldo.js.org/api/
