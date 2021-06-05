import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routerAnimation } from './animation';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: []
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    const res = outlet.activatedRouteData.num === undefined ? -1 : outlet.activatedRouteData.num;
    return res;
  }

}
