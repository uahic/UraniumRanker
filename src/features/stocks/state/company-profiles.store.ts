import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { CompanyProfile } from './company-profile.model';

export interface CompanyProfilesState extends EntityState<CompanyProfile, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'company-profiles' })
export class CompanyProfilesStore extends EntityStore<CompanyProfilesState> {

  constructor() {
    super();
  }

}
