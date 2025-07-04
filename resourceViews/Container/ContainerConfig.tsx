import { ResourceViewConfig } from '../../components/ResourceView';
import { Folders } from '../../lib/icons/Folders';
import { ContainerView } from './ContainerView';

export const ContainerConfig: ResourceViewConfig = {
  name: 'container',
  displayName: 'Container',
  displayIcon: Folders,
  view: ContainerView,
  canDisplay: (targetUri, targetResource) => {
    return targetResource.type === 'SolidContainer';
  },
};
