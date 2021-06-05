import { createSearchableIndex } from '../../../shared/firebase-utils/search-index';
export interface CompanyProfile {
  id: number | string;
  displayName: string;
  numRatings: number;
  sumRatings: number;
  // searchableIndex: Map<string, boolean>;
  symbol: string;
}

export function createCompanyProfile(isin: string, displayName: string, params: Partial<CompanyProfile>) {
  return {
    id: isin,
    displayName: displayName,
    numRatings: 0,
    sumRatings: 0,
    ...params,
    // searchableIndex: createSearchableIndex(displayName),
  } as CompanyProfile;
}
