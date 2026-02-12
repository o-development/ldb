import { Code } from 'lucide-react-native';
import { ResourceViewConfig } from '../../components/ResourceView';
import { RawCodeView } from './RawCodeView';

export const RawCodeResourceView: ResourceViewConfig = {
  name: 'rawCode',
  displayName: 'Raw Code',
  displayIcon: Code,
  view: RawCodeView,
  canDisplay: () => true,
};
