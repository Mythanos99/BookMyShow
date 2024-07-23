import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  constructor() { 
    console.log("Plays Component Constructor Called");
  }

  ngOnInit(): void {
    console.log("Plays Component Loaded");
  }

}
