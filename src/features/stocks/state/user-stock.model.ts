export interface UserStock {
  id:  string;
  uid: string;
  displayName: string;
  isin: string;
  symbol: string;
  // notes?: string;
  rating: number;
}

export function createUserStock(id: string, uid: string, isin: string, displayName: string, symbol: string, params: Partial<UserStock>) {
  return {
    id: id,
    uid: uid,
    isin: isin,
    displayName: displayName,
    symbol: symbol,
    rating: -1,
    ...params
  } as UserStock;
}
