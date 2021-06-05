import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchBar') searchBar: ElementRef;
  @Output() onSelectedOption = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
