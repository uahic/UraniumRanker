import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CompanyProfilesStore, CompanyProfilesState } from './company-profiles.store';

@Injectable({ providedIn: 'root' })
export class CompanyProfilesQuery extends QueryEntity<CompanyProfilesState> {

  constructor(protected store: CompanyProfilesStore) {
    super(store);
  }

  searchStocks(searchTerm: string) {
    return this.selectAll({
      filterBy: entity => entity.displayName.toLowerCase().includes(searchTerm),
      sortBy: 'displayName', limitTo: 10
    });
  }

}
