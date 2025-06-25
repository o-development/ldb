// scripts/adjust-server-paths.js
const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../dist-server/index.html');

fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Regex to prefix all root-relative href and src paths,
  // unless they already contain '/.ui-static/'
  let modifiedData = data.replace(
    /(href|src)=["'](\/(?!\.ui-static\/)\S*?)["']/g,
    (match, attr, urlPath) => {
      return `${attr}="/.ui-static${urlPath}"`;
    },
  );

  // Modify the hydration flag for server-hosted build to false
  modifiedData = modifiedData.replace(
    /globalThis\.__EXPO_ROUTER_HYDRATE__=true;/,
    'globalThis.__EXPO_ROUTER_HYDRATE__=false;',
  );

  fs.writeFile(indexHtmlPath, modifiedData, 'utf8', (err2) => {
    if (err2) {
      console.error('Error writing index.html:', err2);
      return;
    }
    console.log(
      'Successfully adjusted paths and hydration flag in dist-server/index.html',
    );
  });
});
