/**
   * Attempt to get the user's location via the Geolocation Web API.
   *  - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
   * 
   * @returns {Promise}
   */
export default async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (err) => reject(new Error('There was problem detecting your location.'))
      );
    } else {
      return reject(new Error('Your browser is not supported.'));
    }
  });
}