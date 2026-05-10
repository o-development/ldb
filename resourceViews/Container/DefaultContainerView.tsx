import React, { FunctionComponent } from 'react';
import { ContainerView } from './ContainerView';
import { DefaultContainerLayout } from './DefaultContainerLayout';
import { DefaultContainerSideMenu } from './DefaultContainerSideMenu';
import { DefaultContainerContent } from './DefaultContainerContent';
import { DefaultContainerResourceItem } from './DefaultContainerResourceItem';

export const DefaultContainerView: FunctionComponent = () => (
  <ContainerView
    Layout={DefaultContainerLayout}
    SideMenu={DefaultContainerSideMenu}
    Content={DefaultContainerContent}
    ResourceItem={DefaultContainerResourceItem}
  />
);
