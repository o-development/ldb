import { SolidContainer, SolidContainerSlug } from '@ldo/connected-solid';
import { Folder } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

export const createContainerResourceCreator: ResourceCreatorConfig = {
  name: 'createContainer',
  displayName: 'Container',
  displayIcon: Folder,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ container, messager }) => {
    messager.loadingMessage('Asking for container name…');
    const givenName = await messager.prompt('Enter Container Name');
    if (!givenName) return;
    messager.loadingMessage(`Creating container ${givenName}…`);
    const slug = (
      givenName.endsWith('/') ? givenName : `${givenName}/`
    ) as SolidContainerSlug;
    const createResult = await container.createChildIfAbsent(slug);
    if (createResult.isError)
      messager.toast(createResult.message, { title: 'Error' });
    else if (createResult.type === 'containerReadSuccess')
      messager.toast(`${slug} already exists.`);
  },
};
