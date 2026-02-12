import { SolidLeaf } from '@ldo/connected-solid';
import { Image as ImageIcon } from 'lucide-react-native';
import { ResourceViewConfig } from '../../components/ResourceView';
import { ImageView } from './ImageView';

export const ImageResourceView: ResourceViewConfig = {
  name: 'image',
  displayName: 'Image',
  displayIcon: ImageIcon,
  view: ImageView,
  canDisplay: (_targetUri, targetResource) => {
    if (targetResource.type !== 'SolidLeaf') return false;
    const leaf = targetResource as SolidLeaf;
    if (leaf.isBinary() !== true) return false;
    const blob = leaf.getBlob();
    return !!blob && blob.type.startsWith('image/');
  },
};
