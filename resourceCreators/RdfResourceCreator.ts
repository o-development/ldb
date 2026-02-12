import { SolidContainer, SolidContainerSlug } from '@ldo/connected-solid';
import { Code } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

export const RdfResourceCreator: ResourceCreatorConfig = {
  name: 'createRdf',
  displayName: 'RDF Turtle',
  displayIcon: Code,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ container, createUtils }) => {
    createUtils.loadingMessage('Asking for file name…');
    const givenName = await createUtils.prompt('Enter File Name');
    if (!givenName) return;
    createUtils.loadingMessage(`Creating ${givenName}…`);
    const slug = (
      givenName.endsWith('.ttl') ? givenName : `${givenName}.ttl`
    ) as SolidContainerSlug;
    const createResult = await container.createChildIfAbsent(slug);
    if (createResult.isError)
      createUtils.toast(createResult.message, { title: 'Error' });
    else if (createResult.type === 'containerReadSuccess')
      createUtils.toast(`${slug} already exists.`);
  },
};
