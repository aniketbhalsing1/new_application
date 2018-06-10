import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  tabA : boolean =  false; 
  tabB : boolean =  false;
  tabC : boolean =  false;
  tabD : boolean =  false;
  tabE : boolean =  false;

  constructor() { }

  ngOnInit() {
  }

  enableTab(tab){
    this.tabA = this.tabB = this.tabC = this.tabD = this.tabE = false;
    tab = true;
  }

}
