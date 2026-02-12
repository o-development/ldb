import { SolidContainer, SolidContainerSlug } from '@ldo/connected-solid';
import { Code } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

export const RdfResourceCreator: ResourceCreatorConfig = {
  name: 'createRdf',
  displayName: 'RDF Turtle',
  displayIcon: Code,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ container, messager }) => {
    messager.loadingMessage('Asking for file name…');
    const givenName = await messager.prompt('Enter File Name');
    if (!givenName) return;
    messager.loadingMessage(`Creating ${givenName}…`);
    const slug = (
      givenName.endsWith('.ttl') ? givenName : `${givenName}.ttl`
    ) as SolidContainerSlug;
    const createResult = await container.createChildIfAbsent(slug);
    if (createResult.isError)
      messager.toast(createResult.message, { title: 'Error' });
    else if (createResult.type === 'containerReadSuccess')
      messager.toast(`${slug} already exists.`);
  },
};
