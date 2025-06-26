import { SolidContainer, SolidLeaf } from '@ldo/connected-solid';
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
  ) => boolean;
}
