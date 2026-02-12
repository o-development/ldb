import { ResourceViewConfig } from '../../components/ResourceView';
import { Folders } from 'lucide-react-native';
import { ContainerView } from './ContainerView';

export const ContainerResourceView: ResourceViewConfig = {
  name: 'container',
  displayName: 'Container',
  displayIcon: Folders,
  view: ContainerView,
  canDisplay: (targetUri, targetResource) => {
    return targetResource.type === 'SolidContainer';
  },
};
