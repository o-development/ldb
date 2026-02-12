import { Platform } from 'react-native';
import { fetch as solidAuthFetch } from '@inrupt/solid-client-authn-browser';
import { dataset } from '@ldo/solid-react';

/**
 * Wraps the Solid auth fetch to convert Blob request bodies to ArrayBuffer
 * on React Native. RN's fetch doesn't properly marshal Blob as body.
 * @see https://ldo.js.org/latest/guides/solid/#creating-or-uploading
 */
function createSolidFetch(): typeof fetch {
  const baseFetch = solidAuthFetch;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    if (Platform.OS !== 'web' && init?.body instanceof Blob) {
      const arrayBuffer = await init.body.arrayBuffer();
      return baseFetch(input, { ...init, body: arrayBuffer });
    }
    return baseFetch(input, init);
  };
}

dataset.setContext('solid', { fetch: createSolidFetch() });
