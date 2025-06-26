import createContainer from 'constate';
import React, { useEffect, useMemo, useState } from 'react';
import { useDataBrowserConfig } from '../DataBrowser';
import { useTargetResource } from '../TargetResourceProvider';
import { ResourceViewConfig } from '../ResourceView';
import { EyeOff } from '~/lib/icons/EyeOff';
import { ErrorMessageResourceView } from './utilityResourceViews/ErrorMessageResourceView';

export const [ValidViewProvider, useValidView] = createContainer(() => {
  const { targetUri, targetResource } = useTargetResource();
  const { views } = useDataBrowserConfig();

  const validViews = useMemo(() => {
    const noValidView: ResourceViewConfig = {
      name: 'noValid',
      displayName: 'No Valid View',
      displayIcon: EyeOff,
      view: () => (
        <ErrorMessageResourceView
          icon={EyeOff}
          message="No Views are available to display this resource."
        />
      ),
      canDisplay: () => false,
    };
    if (
      !targetResource ||
      !targetUri ||
      targetResource.type === 'InvalidIdentifierResouce'
    ) {
      return [noValidView];
    }
    const potentialViews = views.filter((view) =>
      view.canDisplay(targetUri, targetResource),
    );
    return potentialViews.length > 0 ? potentialViews : [noValidView];
  }, [targetResource, targetUri, views]);

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
  };
});
