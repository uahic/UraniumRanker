import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '@auth/state/users.service';
import { UsersQuery } from '@auth/state/users.query';

@Component({
  selector: 'app-company-individual-ratings',
  templateUrl: './company-individual-ratings.component.html',
  styleUrls: ['./company-individual-ratings.component.scss']
})
export class CompanyIndividualRatingsComponent implements OnInit, OnChanges {
  private _id = new Subject<string>();

  @Input() id: string | undefined;

  userRatings$: Observable<any>;

  constructor(private db: AngularFirestore, private usersService: UsersService, private usersQuery: UsersQuery) { }

  ngOnInit(): void {
    this.usersService.init();

    this.userRatings$ = this._id
      .pipe(
        distinctUntilChanged(),
        switchMap(id =>
          this.db.collection('user-stocks', ref => ref.where('isin', '==', id))
            .valueChanges()
        ),
        map(record => record.map((r: any) => ({ uid: r.uid, displayName: this.usersQuery.getDisplayName(r.uid), rating: r.rating }))),
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes && !!changes.id) {
      this._id.next(changes.id.currentValue);
    }
  }

}
