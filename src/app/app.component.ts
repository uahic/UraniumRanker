import { Component } from '@angular/core';
import { UserStocksService } from '../features/stocks/state/user-stocks.service';
import { AuthService } from '../auth/state/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Uranium-Ranker';

  constructor(
    private authService: AuthService,
    private stockService: UserStocksService
    ) {
  }
}
