import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIKeys } from './api-keys';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) {
  }
}
