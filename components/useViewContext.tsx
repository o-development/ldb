import createContainer from 'constate';
import React, { useEffect, useMemo, useState } from 'react';
import { useDataBrowserConfig } from './DataBrowser';
import { useTargetResource } from './TargetResourceProvider';
import { ResourceViewConfig } from './ResourceView';
import { EyeOff } from '../lib/icons/EyeOff';
import { OctagonX } from '../lib/icons/OctagonX';
import { CircleSlash } from '../lib/icons/CircleSlash';
import { TextCursorInput } from '../lib/icons/TextCursorInput';
import { ShieldX } from '../lib/icons/ShieldX';
import { CircleX } from '../lib/icons/CircleX';
import { Loader } from '../lib/icons/Loader';
import { ErrorMessageResourceView } from './utilityResourceViews/ErrorMessageResourceView';
import { SolidContainer, SolidLeaf } from '@ldo/connected-solid';
import { LucideIcon } from 'lucide-react-native';
import { useLdo } from '@ldo/solid-react';

export const [ViewContextProvider, useViewContext] = createContainer(() => {
  const { targetUri, targetResource, refresh, navigateTo } =
    useTargetResource();
  const { views } = useDataBrowserConfig();
  const { dataset } = useLdo();

  /**
   * Calculate Valid Views
   */
  const validViews = useMemo(() => {
    if (!targetResource || !targetUri) {
      return [
        constructErrorView(
          'Enter a URI in the address bar to view a resource.',
          TextCursorInput,
        ),
      ];
    } else if (targetResource.type === 'InvalidIdentifierResouce') {
      return [
        constructErrorView(
          `${targetResource.uri} is an invalid URI.`,
          CircleSlash,
        ),
      ];
    }

    const errorViews = getErrorViews(targetResource);
    if (errorViews) return errorViews;

    console.log(dataset.toString());

    const potentialViews = views.filter((view) =>
      view.canDisplay(targetUri!, targetResource!, dataset),
    );

    return potentialViews.length > 0
      ? potentialViews
      : [constructErrorView(`No valid view for ${targetUri}`, OctagonX)];
  }, [targetResource, targetUri, views, dataset]);

  const [curViewConfig, setCurViewConfig] = useState<ResourceViewConfig>(
    validViews[0],
  );
  useEffect(() => {
    setCurViewConfig(validViews[0]);
  }, [targetUri, validViews]);

  return {
    validViews,
    curViewConfig,
    setCurViewConfig,
    targetResource,
    targetUri,
    refresh,
    navigateTo,
  };
});

function constructErrorView(
  message: string,
  icon: LucideIcon,
): ResourceViewConfig {
  return {
    name: 'noValidView',
    displayName: 'No Valid View',
    displayIcon: EyeOff,
    view: () => <ErrorMessageResourceView icon={icon} message={message} />,
    canDisplay: () => true,
  };
}

function getErrorViews(
  targetResource: SolidLeaf | SolidContainer,
): ResourceViewConfig[] | undefined {
  // Handle Edge cases
  if (targetResource.status.type === 'unfetched') {
    return [constructErrorView(`Loading`, Loader)];
  } else if (targetResource.isAbsent()) {
    return [
      constructErrorView(
        `${targetResource.uri} either doesn't exist or you don't have read access to it.`,
        CircleSlash,
      ),
    ];
  } else if (targetResource.status.isError) {
    switch (targetResource.status.type) {
      case 'noncompliantPodError':
        return [
          constructErrorView(
            `${targetResource.uri} returned a response that is not compliant with the Linked Web Storage specification: ${targetResource.status.message}`,
            OctagonX,
          ),
        ];
      case 'serverError':
        return [
          constructErrorView(
            `${targetResource.uri} encountered an internal server error: ${targetResource.status.message}`,
            OctagonX,
          ),
        ];
      case 'unauthenticatedError':
        return [
          constructErrorView(
            `${targetResource.uri} requires you to log in to view.`,
            ShieldX,
          ),
        ];
      case 'unauthorizedError':
        return [
          constructErrorView(
            `You don't have access to ${targetResource.uri}.`,
            ShieldX,
          ),
        ];
      case 'unexpectedHttpError':
      case 'unexpectedResourceError':
      default:
        return [
          constructErrorView(
            `An unexpected error occurred: ${targetResource.status.message}.`,
            CircleX,
          ),
        ];
    }
  }
}
