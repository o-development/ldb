import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react';
import { useTargetResource } from '../TargetResourceProvider';
import { ResourceViewConfig } from '../ResourceView';
import { ErrorMessageResourceView } from './utilityResourceViews/ErrorMessageResourceView';
import { TextCursorInput } from '../../lib/icons/TextCursorInput';
import { CircleSlash } from '../../lib/icons/CircleSlash';
import { OctagonX } from '../../lib/icons/OctagonX';
import { ShieldX } from '../../lib/icons/ShieldX';
import { CircleX } from '../../lib/icons/CircleX';
import { Header } from './header/Header';
import { View } from 'react-native';
import { useValidView, ValidViewProvider } from './useValidView';
import { DialogProvider } from './DialogProvider';

export const ValidViewContext = createContext<{
  validViews: ResourceViewConfig[];
  curViewConfig: ResourceViewConfig;
  setCurViewConfig: Dispatch<SetStateAction<ResourceViewConfig>>;
  // @ts-ignore This will be filled in later
}>({});

export const Layout: FunctionComponent = () => {
  return (
    <DialogProvider>
      <ValidViewProvider>
        <Header />
        <View className="flex-1 z-0">
          <RenderView />
        </View>
      </ValidViewProvider>
    </DialogProvider>
  );
};

/**
 * =============================================================================
 * Render View
 * =============================================================================
 */

export const RenderView: FunctionComponent = () => {
  const { targetUri, targetResource } = useTargetResource();

  const { curViewConfig } = useValidView();

  // Handle Edge cases
  if (!targetResource || !targetUri) {
    return (
      <ErrorMessageResourceView
        icon={TextCursorInput}
        message="Enter a URI in the address bar to view a resource."
      />
    );
  } else if (targetResource.type === 'InvalidIdentifierResouce') {
    return (
      <ErrorMessageResourceView
        icon={CircleSlash}
        message={`${targetResource.uri} is an invalid URI.`}
      />
    );
  } else if (targetResource?.isDoingInitialFetch()) {
    return <></>;
  } else if (targetResource?.isAbsent()) {
    return (
      <ErrorMessageResourceView
        icon={CircleSlash}
        message={`${targetResource.uri} either doesn't exist or you don't have read access to it.`}
      />
    );
  } else if (targetResource?.status.isError) {
    switch (targetResource.status.type) {
      case 'noncompliantPodError':
        return (
          <ErrorMessageResourceView
            icon={OctagonX}
            message={`${targetResource.uri} returned a response that is not compliant with the Linked Web Storage specification: ${targetResource.status.message}`}
          />
        );
      case 'serverError':
        return (
          <ErrorMessageResourceView
            icon={OctagonX}
            message={`${targetResource.uri} encountered an internal server error: ${targetResource.status.message}`}
          />
        );
      case 'unauthenticatedError':
        return (
          <ErrorMessageResourceView
            icon={ShieldX}
            message={`${targetResource.uri} requires you to log in to view.`}
          />
        );
      case 'unauthorizedError':
        return (
          <ErrorMessageResourceView
            icon={ShieldX}
            message={`You don't have access to ${targetResource.uri}.`}
          />
        );
      case 'unexpectedHttpError':
      case 'unexpectedResourceError':
      default:
        return (
          <ErrorMessageResourceView
            icon={CircleX}
            message={`An unexpected error occurred: ${targetResource.status.message}.`}
          />
        );
    }
  }
  const CurView = curViewConfig.view;
  return <CurView />;
};
