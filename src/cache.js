// cache.js
const cache = {};

export const getFromCache = (key) => {
  if (cache[key] && cache[key].expiry > Date.now()) {
    return cache[key].data;
  }
  return null;
};

export const addToCache = (key, data, expiryDuration) => {
  cache[key] = {
    data,
    expiry: Date.now() + expiryDuration,
  };
};
