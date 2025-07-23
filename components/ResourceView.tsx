import {
  SolidConnectedPlugin,
  SolidContainer,
  SolidLeaf,
} from '@ldo/connected-solid';
import { ConnectedLdoDataset } from '@ldo/connected';
import { LucideIcon } from 'lucide-react-native';
import { ElementType } from 'react';
export interface ResourceViewConfig {
  name: string;
  displayName: string;
  displayIcon: LucideIcon;
  view: ElementType;
  canDisplay: (
    targetUri: string,
    targetResource: SolidLeaf | SolidContainer,
    dataset: ConnectedLdoDataset<SolidConnectedPlugin[]>,
  ) => boolean;
}
