import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private db: AngularFirestore) { }

  searchStocks(searchTerm: string) {
    return this.db.collection('company-profiles',
      ref => ref.orderBy(`searchableIndex.${searchTerm}`).limit(5)).valueChanges();
  }
}
