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

  // Check chance of rain over next 5 days.
  for (let i = 0; i < 5; i++) {
    const day = daily.data[i];

    // Between 25% and 40% chance of precipitation.
    if (
      (0.25 < day.precipProbability) && (day.precipProbability < 0.4)
      && result < Results.MAYBE_YES
    ) {
      result = Results.MAYBE_YES;
    }

    // Between 40% and 60% chance of precipitation.
    else if (
      (0.4 < day.precipProbability) && (day.precipProbability < 0.6) 
      && result < Results.MAYBE_NO) {
      result = Results.MAYBE_NO;
    }

    // Over 60% chance of precipitation.
    else if (day.precipProbability > 0.6) {
      result = Results.NO;
    }
  }
  return result;
}