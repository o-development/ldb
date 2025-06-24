import React from 'react';
import { DataBrowser } from '~/components/DataBrowser';
import { Text } from '~/components/ui/text';
import { RawCodeConfig } from '~/resourceViews/RawCode/RawCodeConfig';
import { ContainerConfig } from '~/resourceViews/Container/ContainerConfig';

export default function Screen() {
  const mode = process.env.IS_SERVER_HOSTED ? 'server-ui' : 'standalone-app';

  return (
    <DataBrowser
      views={[ContainerConfig, RawCodeConfig]}
      mode={mode}
      renderHomepage={() => <Text>Hopepage</Text>}
      renderLogo={() => <Text>Logo</Text>}
    />
  );
}
