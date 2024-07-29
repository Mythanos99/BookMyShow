import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { Movie } from 'src/app/models/movie';
import { SearchService } from 'src/app/services/search/search.service';
import { LocationService } from 'src/app/sharedservice/location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  arrMovies: Movie[] = [];
  arrCinemas: Cinema[] = [];
  arrEvents: Event[] = []; // Add appropriate types
  arrPlays: any[] = []; // Add appropriate types
  arrSports: any[] = []; // Add appropriate types
  hasData: boolean = false;
  loading: boolean = false;
  location: string = '';
  searchQuery: string = '';
  trendingMovies: any[] = []; // Static data for trending movies
  trendingEvents: any[] = []; // Static data for trending events
  trendingPlays: any[] = []; // Static data for trending plays

  constructor(private searchService: SearchService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.cityName$.subscribe(city => {
      if (city) this.location = city;
    });

    // Initialize static data for trending movies, events, and plays
    this.trendingMovies = [
      { name: 'Movie 1' },
      { name: 'Movie 2' },
      { name: 'Movie 3' },
      { name: 'Movie 4' },
      { name: 'Movie 5' }
    ];

    this.trendingEvents = [
      { name: 'Event 1' },
      { name: 'Event 2' },
      { name: 'Event 3' },
      { name: 'Event 4' },
      { name: 'Event 5' }
    ];

    this.trendingPlays = [
      { name: 'Play 1' },
      { name: 'Play 2' },
      { name: 'Play 3' },
      { name: 'Play 4' },
      { name: 'Play 5' }
    ];
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchQuery = query;
    if (query.length >= 2) {
      this.loading = true;
      this.searchService.search(this.location, query).subscribe(response => {
        this.arrMovies = response.movies || [];
        this.arrCinemas = response.cinemas || [];
        this.checkDataAvailability();
      }, error => {
        console.error('Search failed', error);
        this.loading = false;
      });
    } else {
      this.resetResults();
    }
    this.checkDataAvailability();
  }

  private checkDataAvailability() {
    this.hasData = this.arrMovies.length > 0 ||
                    this.arrCinemas.length > 0 ||
                    this.arrEvents.length > 0 ||
                    this.arrPlays.length > 0 ||
                    this.arrSports.length > 0;
    this.loading = false;
  }

  private resetResults() {
    this.arrMovies = [];
    this.arrCinemas = [];
    this.arrEvents = [];
    this.arrPlays = [];
    this.arrSports = [];
    this.hasData = false;
  }
}


