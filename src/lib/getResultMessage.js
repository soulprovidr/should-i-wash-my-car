import { Results } from '../constants';

/**
 * Return the message associated with a specific result.
 *
 * @export
 * @param {*} result
 * @returns
 */
export default function getResultMessage(result) {
  switch (result) {
    case Results.YES:
      return 'Yes.'
    case Results.MAYBE_YES:
      return 'It should be okay.';
    case Results.MAYBE_NO:
      return 'Probably not.';
    case Results.NO:
      return 'No.';
  }
}