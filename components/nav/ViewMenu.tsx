import { FunctionComponent } from 'react';
import { Code } from '~/lib/icons/Code';
import { Folders } from '~/lib/icons/Folders';

const menuItems = [
  {
    icon: Code,
    name: 'Container',
    description:
      'The Container Navigator displays all the contents of a container.',
  },
  {
    icon: Folders,
    title: 'Raw Code',
    description:
      '<ADVANCED> The Raw Code viewer lets you see and modify the raw underlying document.',
  },
];

export const ViewMenu: FunctionComponent = () => {};
