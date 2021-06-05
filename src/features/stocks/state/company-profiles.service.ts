import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { CompanyProfilesStore, CompanyProfilesState } from './company-profiles.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'company-profiles' })
export class CompanyProfilesService extends CollectionService<CompanyProfilesState> {

  constructor(store: CompanyProfilesStore) {
    super(store);
    this.syncCollection().subscribe();
  }




  // updateRating(isin: string, prevRating: number, curRating: number) {
  // }

}
