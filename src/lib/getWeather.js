/**
 * Make API request for weather.
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Promise}
 */
export default async function getWeather(latitude, longitude) {
  return m.request(`${__ENDPOINT__}${latitude}/${longitude}`);
}