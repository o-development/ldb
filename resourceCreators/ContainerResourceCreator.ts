import { SolidContainer, SolidContainerSlug } from '@ldo/connected-solid';
import { Folder } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

export const ContainerResourceCreator: ResourceCreatorConfig = {
  name: 'createContainer',
  displayName: 'Container',
  displayIcon: Folder,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ container, createUtils }) => {
    createUtils.loadingMessage('Asking for container name…');
    const givenName = await createUtils.prompt('Enter Container Name');
    if (!givenName) return;
    createUtils.loadingMessage(`Creating container ${givenName}…`);
    const slug = (
      givenName.endsWith('/') ? givenName : `${givenName}/`
    ) as SolidContainerSlug;
    const createResult = await container.createChildIfAbsent(slug);
    if (createResult.isError)
      createUtils.toast(createResult.message, { title: 'Error' });
    else if (createResult.type === 'containerReadSuccess')
      createUtils.toast(`${slug} already exists.`);
  },
};
