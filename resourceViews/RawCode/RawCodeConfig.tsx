import { ResourceViewConfig } from '~/components/ResourceView';
import { Code } from '~/lib/icons/Code';
import { RawCodeView } from './RawCodeView';

export const RawCodeConfig: ResourceViewConfig = {
  name: 'rawCode',
  displayName: 'Raw Code',
  displayIcon: Code,
  view: RawCodeView,
  canDisplay: () => true,
};
