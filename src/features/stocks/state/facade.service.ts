import { Injectable } from '@angular/core';
import { CompanyProfilesQuery } from './company-profiles.query';
import { CompanyProfilesService } from './company-profiles.service';
import { UserStocksQuery } from './user-stocks.query';
import { UserStocksService } from './user-stocks.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private stocksService: UserStocksService,
    private stocksQuery: UserStocksQuery,
    private companyService: CompanyProfilesService,
    private companyQuery: CompanyProfilesQuery
  ) { }

  deleteUserStock(userStockId: string): void {
    const isin = this.stocksQuery.getEntity(userStockId).isin;
    const companyProfile = this.companyQuery.getEntity(isin);
    const stock = this.stocksQuery.getEntity(userStockId);

    const newSumRatings = stock.rating > -1 ? companyProfile.sumRatings - stock.rating : companyProfile.sumRatings;
    const newNumRatings = stock.rating > -1 ? companyProfile.numRatings - 1 : companyProfile.numRatings;

    this.stocksService.remove(userStockId);
    this.companyService.update(isin, { sumRatings: newSumRatings, numRatings: newNumRatings });
  }

  updateUserStockRating(userStockId: string, newRating: number): void {
    const isin = this.stocksQuery.getEntity(userStockId).isin;
    const companyProfile = this.companyQuery.getEntity(isin);

    const prevRating = this.stocksQuery.getEntity(userStockId).rating;
    const sumRatings = companyProfile.sumRatings;

    const newSumRatings = prevRating > -1 ? sumRatings + (newRating - prevRating) : sumRatings + newRating;
    const newNumRatings = prevRating > -1 ? companyProfile.numRatings : companyProfile.numRatings + 1;

    this.stocksService.update(userStockId, {rating: newRating});
    this.companyService.update(isin, { sumRatings: newSumRatings, numRatings: newNumRatings });
  }
}
