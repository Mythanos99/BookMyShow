import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { LocationService } from 'src/app/sharedservice/location.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  location: string | null = null;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedGenres: string[] = [];
  selectedLanguages: string[] = [];
  selectedFormat: string[] = [];
  genres: string[] = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror'];
  availableLanguages: string[] = ['English', 'Hindi', 'Korean'];
  availableFormats: string[] = ['2D', '3D', 'IMAX'];
  viewMode:string='current';
  private initialLoad = true;
  isDropdownOpen: { [key: string]: boolean } = {
    language: true,
    genre: false,
    format: false
  };

  constructor(private movieService: MovieService, private locationService: LocationService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchMovies();
      this.fetchfilters();

    });
    this.route.queryParams.subscribe(params => {
      if (this.initialLoad) {
        this.initialLoad = false; // Flag to make sure the params from the url are fetched only once.
        this.initializeFiltersFromQueryParams(params);
        this.applyFilters(); // Fetch initial movie list based on URL filters
      }
    });
  }
  fetchfilters():void{
    const params = [];
    if (this.location) {
      params.push(`location=${this.location}`);
    }
    this.movieService.getMovieFilters(params.join('&')).subscribe(response => {
      this.genres = response.genres; 
      this.availableLanguages = response.languages; 
      this.availableFormats = response.formats; 
    });
  }
  initializeFiltersFromQueryParams(params: any): void {
    if (params['languages']) {
      this.selectedLanguages = params['languages'].split(',');
    }
    if (params['genres']) {
      this.selectedGenres = params['genres'].split(',');
    }
    if (params['formats']) {
      this.selectedFormat = params['formats'].split(',');
    }
  }

  onCheckboxChange(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (type === 'genre') {
      this.updateSelectedItems(value, this.selectedGenres, input.checked);
    } else if (type === 'language') {
      this.updateSelectedItems(value, this.selectedLanguages, input.checked);
    } else if (type === 'format') {
      this.updateSelectedItems(value, this.selectedFormat, input.checked);
    }
  }

  updateSelectedItems(value: string, selectedArray: string[], isChecked: boolean): void {
    if (isChecked) {
      selectedArray.push(value);
    } else {
      const index = selectedArray.indexOf(value);
      if (index > -1) {
        selectedArray.splice(index, 1);
      }
    }
  }
  onFilterChange(type: string, value: string): void {
    if (type === 'genre') {
      this.updateSelectedItems(value, this.selectedGenres, !this.selectedGenres.includes(value));
    } else if (type === 'language') {
      this.updateSelectedItems(value, this.selectedLanguages, !this.selectedLanguages.includes(value));
    } else if (type === 'format') {
      this.updateSelectedItems(value, this.selectedFormat, !this.selectedFormat.includes(value));
    }
  }
  applyFilters(): void {
    let queryParams: Params = {};
  
    if (this.selectedLanguages.length) {
      queryParams['languages'] = this.selectedLanguages.join(',');
    } else {
      queryParams['languages'] = null; // Remove 'languages' from URL if empty
    }
  
    if (this.selectedGenres.length) {
      queryParams['genres'] = this.selectedGenres.join(',');
    } else {
      queryParams['genres'] = null; // Remove 'genres' from URL if empty
    }
  
    if (this.selectedFormat.length) {
      queryParams['formats'] = this.selectedFormat.join(',');
    } else {
      queryParams['formats'] = null; // Remove 'formats' from URL if empty
    }
  
    // Update the query parameters in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // merge with existing query params
    });
  
    this.fetchMovies();
  }
  

  clearFilter(type: string): void {
    if (type === 'genre') {
      this.selectedGenres = [];
    } else if (type === 'language') {
      this.selectedLanguages = [];
    } else if (type === 'format') {
      this.selectedFormat = [];
    }
  }

  fetchMovies(): void {
    const queryParams = this.buildQueryParams();
    if(this.viewMode=='current'){
    this.movieService.getFilteredMovies(queryParams).subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
    }
    else{
      this.movieService.getUpcomingMovies(queryParams).subscribe(movies => {
        this.movies = movies;
        this.filteredMovies = movies;
      });
    }
  }

  buildQueryParams(): string {
    const params = [];

    if (this.location) {
      params.push(`location=${this.location}`);
    }
    if(this.viewMode=='upcoming') return params.join('&');
    if (this.selectedLanguages.length > 0) {
      params.push(`languages=${this.selectedLanguages.join('|')}`);
    }
    if (this.selectedGenres.length > 0) {
      params.push(`genre=${this.selectedGenres.join('|')}`);
    }
    if (this.selectedFormat.length > 0) {
      params.push(`format=${this.selectedFormat.join('|')}`);
    }

    return params.join('&');
  }

  toggleDropdown(type: string): void {
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }
  resetAllFilters() {
    this.selectedGenres = [];
    this.selectedLanguages = [];
    this.selectedFormat = [];
    this.applyFilters();
  }
  fetchMovieDetails(movie: any): void {
    this.router.navigate([`/movies/${movie._id}`]);
  }
  changeViewMode(mode:string):void{
    this.viewMode=mode;
  }

  // #FIXME- lot of useless code present. Clean it
  

  // TODO - make a helper function to build query params
  // [x]- clean the code
  // BUG - fix the issue with the upcoming movies

}
