import { SolidContainer, SolidLeafSlug } from '@ldo/connected-solid';
import { FileUp } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

/** Basename of a path or file name (handles forward slashes). */
function basename(path: string): string {
  const lastSlash = path.lastIndexOf('/');
  return lastSlash === -1 ? path : path.slice(lastSlash + 1);
}

export const FileUploadResourceCreator: ResourceCreatorConfig = {
  name: 'uploadFile',
  displayName: 'File Upload',
  displayIcon: FileUp,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ container, createUtils }) => {
    if (!createUtils.promptFile) {
      createUtils.toast('File picker is not available.', { title: 'Error' });
      return;
    }
    createUtils.loadingMessage('Choosing file…');
    const file = await createUtils.promptFile({ title: 'Upload file' });
    if (!file) return;
    const slug = basename(file.name) as SolidLeafSlug;
    const mimeType = file.type || 'application/octet-stream';
    createUtils.loadingMessage(`Uploading ${slug}…`);
    const result = await container.uploadChildAndOverwrite(
      slug,
      file,
      mimeType,
    );
    if (result.isError) {
      createUtils.toast(result.message, { title: 'Error' });
    } else {
      createUtils.toast(`${slug} uploaded.`);
    }
  },
};
