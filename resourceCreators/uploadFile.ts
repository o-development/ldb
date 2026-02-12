import { SolidContainer } from '@ldo/connected-solid';
import { FileUp } from 'lucide-react-native';
import { ResourceCreatorConfig } from '../components/ResourceCreator';

export const uploadFileResourceCreator: ResourceCreatorConfig = {
  name: 'uploadFile',
  displayName: 'File Upload',
  displayIcon: FileUp,
  canCreate: (container): container is SolidContainer =>
    container.type === 'SolidContainer',
  create: async ({ messager }) => {
    messager.loadingMessage('File upload not implemented yet.');
    messager.toast('Not Implemented');
  },
};
