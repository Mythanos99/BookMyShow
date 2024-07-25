import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { Movie } from 'src/app/models/movie';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  arrMovies:Movie[]=[];
  arrCinemas:Cinema[]=[];
  constructor(private searchService:SearchService) { 
  }

  ngOnInit(): void {

  }
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    if (query.length >= 2) {
      this.searchService.search('Bengaluru', query).subscribe(response => {
        this.arrMovies = response.movies || [];
        this.arrCinemas = response.cinemas || [];
      });
    } else {
      this.arrMovies = [];
      this.arrCinemas = [];
    }
  }


}
