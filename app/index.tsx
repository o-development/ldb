import React from 'react';
import { DataBrowser } from '~/components/DataBrowser';
import { Text } from '~/components/ui/text';
import { RawCodeConfig } from '~/resourceViews/RawCode/RawCodeConfig';

export default function Screen() {
  return (
    <DataBrowser
      views={[RawCodeConfig]}
      mode="standalone-app"
      defaultIssuer="http://localhost:3000"
      renderHomepage={() => <Text>Hopepage</Text>}
      renderLogo={() => <Text>Logo</Text>}
      host="localhost:8081"
    />
  );
}
