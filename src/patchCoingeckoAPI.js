// patchCoingeckoAPI.js
import 'url-search-params-polyfill';

const originalSearchParams = URLSearchParams;
const originalCreate = URLSearchParams.prototype.create;

URLSearchParams.prototype.create = function (entries) {
  return new originalSearchParams(entries).toString();
};

export default function patchCoingeckoAPI() {
  URLSearchParams = originalSearchParams;
  URLSearchParams.prototype.create = originalCreate;
}
