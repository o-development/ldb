import React from 'react';
import { DataBrowser } from '~/components/DataBrowser';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <DataBrowser
      views={[]}
      mode="standalone-app"
      defaultIssuer="http://localhost:3000"
      renderHomepage={() => <Text>Hopepage</Text>}
      renderLogo={() => <Text>Logo</Text>}
    />
  );
}
