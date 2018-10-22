import { Results } from '../constants';

/**
 * Calculate the result based on weather response data.
 *
 * @export
 * @param {Object} response
 * @returns {Number} result 
 */
export default function calculateResult({ daily }) {
  let result = Results.YES;

  // Check chance of rain over next 3 days.
  for (let i = 0; i < 3; i++) {
    const day = daily.data[i];

    // Between 40% and 60% chance of precipitation.
    if (
      (0.4 < day.precipProbability) && (day.precipProbability < 0.6)
      && result < Results.MAYBE_YES
    ) {
      result = Results.MAYBE_YES;
    }

    // Between 60% and 75% chance of precipitation.
    else if (
      (0.6 < day.precipProbability) && (day.precipProbability < 0.75) 
      && result < Results.MAYBE_NO) {
      result = Results.MAYBE_NO;
    }

    // Over 75% chance of precipitation.
    else if (day.precipProbability > 0.75) {
      result = Results.NO;
    }
  }
  return result;
}