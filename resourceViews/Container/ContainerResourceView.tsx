import { ResourceViewConfig } from '../../components/ResourceView';
import { Folders } from 'lucide-react-native';
import { DefaultContainerView } from './DefaultContainerView';

export const ContainerResourceView: ResourceViewConfig = {
  name: 'container',
  displayName: 'Container',
  displayIcon: Folders,
  view: DefaultContainerView,
  canDisplay: (targetUri, targetResource) => {
    return targetResource.type === 'SolidContainer';
  },
};
