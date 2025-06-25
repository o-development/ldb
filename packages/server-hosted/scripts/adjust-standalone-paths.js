// scripts/adjust-server-paths.js
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../dist-standalone/index.html');

fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Modify the hydration flag for server-hosted build to false
  let modifiedData = data.replace(
    /globalThis\.__EXPO_ROUTER_HYDRATE__=true;/,
    'globalThis.__EXPO_ROUTER_HYDRATE__=false;',
  );

  fs.writeFile(indexHtmlPath, modifiedData, 'utf8', (err2) => {
    if (err2) {
      console.error('Error writing index.html:', err2);
      return;
    }
    console.log(
      'Successfully adjusted hydration flag in dist-standalone/index.html',
    );
  });
});
