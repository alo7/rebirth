/**
 * Convert to string
 * @param {*} val - The value to convert
 * @return {string}
 */
const anyToString = val => {
  if (({}).toString.call(val) === '[object Object]') {
    return JSON.stringify(val);
  }

  return String(val);
};

/**
 * The url parameter is converted to an object
 * @param {string} params - Rrl params string
 * @return {Object}
 */
const urlParamsToObj = params => {
  if (!params) return {};

  const result = {};

  params.split('&').forEach(p => {
    if (p.indexOf('=') === -1) {
      result[p] = undefined;
      return;
    }

    const [key, value] = p.split('=');
    result[key] = value;
  });
  return result;
};

module.exports.anyToString = anyToString;
module.exports.urlParamsToObj =urlParamsToObj;
