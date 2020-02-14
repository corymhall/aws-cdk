import { FieldToMatch } from './statement';

/**
 * Update
 */
export function returnFieldToMatchValue(fieldToMatch?: FieldToMatch, fieldToMatchValue?: string): object {
    if (fieldToMatch !== undefined) {
      switch (fieldToMatch) {
        case FieldToMatch.URI_PATH || FieldToMatch.SINGLE_HEADER || FieldToMatch.SINGLE_QUERY_ARGUMENT: {
          return {
            [fieldToMatch]: {
              Name: fieldToMatchValue
            }
          };
        }
        default: {
          return {
            [fieldToMatch]: {}
          };
        }
      }
    } else {
      return {};
    }
}
