import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor() { 
    console.log("Movies Component Constructor Called");
    // This confirms that movies is getting loaded only when the movies tab is clicked. 
    // #FIXME check if lazy loading is needed for this? 
  }

  ngOnInit(): void {
    console.log("Movies Component Loaded");
  }

}
