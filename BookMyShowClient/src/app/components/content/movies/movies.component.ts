import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Language, Genre, Format } from 'src/app/constants/filters';

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
  viewMode: string = 'current';
  private initialLoad = true;
  backendurl: string = 'http://localhost:3000/';

  isDropdownOpen: { [key: string]: boolean } = {
    language: true,
    genre: false,
    format: false
  };

  constructor(
    private movieService: MovieService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchMovies();
      if (this.viewMode === 'current') {
        this.fetchFilters();
      } else {
        this.setStaticFilters();
      }
    });

    this.route.queryParams.subscribe(params => {
      if (this.initialLoad) {
        this.initialLoad = false; // Fetch the params from the URL only once
        this.initializeFiltersFromQueryParams(params);
        this.applyFilters(); // Fetch initial movie list based on URL filters
      }
    });
  }

  fetchFilters(): void {
    const params = this.buildQueryParams();
    this.movieService.getMovieFilters(params).subscribe(response => {
      this.genres = response.genres;
      this.availableLanguages = response.languages;
      this.availableFormats = response.formats;
    });
  }

  setStaticFilters(): void {
    this.genres = Genre; // Assuming Genre is an array from filters
    this.availableLanguages = Language; // Assuming Language is an array from filters
    this.availableFormats = Format; // Assuming Format is an array from filters
  }

  initializeFiltersFromQueryParams(params: any): void {
    this.selectedLanguages = params['languages'] ? params['languages'].split(',') : [];
    this.selectedGenres = params['genres'] ? params['genres'].split(',') : [];
    this.selectedFormat = params['formats'] ? params['formats'].split(',') : [];
  }

  onFilterChange(type: string, value: string): void {
    const selectedArray = this.getSelectedArray(type);
    const isSelected = selectedArray.includes(value);
    this.updateSelectedItems(value, selectedArray, !isSelected);
  }

  getSelectedArray(type: string): string[] {
    switch (type) {
      case 'genre':
        return this.selectedGenres;
      case 'language':
        return this.selectedLanguages;
      case 'format':
        return this.selectedFormat;
      default:
        return [];
    }
  }

  updateSelectedItems(value: string, selectedArray: string[], shouldSelect: boolean): void {
    if (shouldSelect) {
      selectedArray.push(value);
    } else {
      const index = selectedArray.indexOf(value);
      if (index > -1) {
        selectedArray.splice(index, 1);
      }
    }
  }

  applyFilters(): void {
    const queryParams: Params = this.buildQueryParamsObject();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Merge with existing query params
    });

    this.fetchMovies();
  }

  buildQueryParamsObject(): Params {
    const queryParams: Params = {};

    queryParams['languages'] = this.selectedLanguages.length ? this.selectedLanguages.join(',') : null;
    queryParams['genres'] = this.selectedGenres.length ? this.selectedGenres.join(',') : null;
    queryParams['formats'] = this.selectedFormat.length ? this.selectedFormat.join(',') : null;

    return queryParams;
  }

  buildQueryParams(): string {
    const params: string[] = [];

    if (this.location) {
      params.push(`location=${this.location}`);
    }
    if (this.selectedLanguages.length) {
      params.push(`languages=${this.selectedLanguages.join('|')}`);
    }
    if (this.selectedGenres.length) {
      params.push(`genre=${this.selectedGenres.join('|')}`);
    }
    if (this.selectedFormat.length) {
      params.push(`format=${this.selectedFormat.join('|')}`);
    }

    return params.join('&');
  }

  clearFilter(type: string): void {
    switch (type) {
      case 'genre':
        this.selectedGenres = [];
        break;
      case 'language':
        this.selectedLanguages = [];
        break;
      case 'format':
        this.selectedFormat = [];
        break;
    }
  }

  fetchMovies(): void {
    const queryParams = this.buildQueryParams();
    const movieObservable = this.viewMode === 'current'
      ? this.movieService.getFilteredMovies(queryParams)
      : this.movieService.getUpcomingMovies(queryParams);

    movieObservable.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  getimageurl(movieurl: string): string {
    return `${this.backendurl}${movieurl}`;
  }

  toggleDropdown(type: string): void {
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }

  resetAllFilters(): void {
    this.selectedGenres = [];
    this.selectedLanguages = [];
    this.selectedFormat = [];
    this.applyFilters();
  }

  fetchMovieDetails(movie: any): void {
    this.router.navigate([`/movies/${movie._id}`]);
  }

  changeViewMode(mode: string): void {
    this.viewMode = mode;
    if (mode === 'upcoming') {
      this.setStaticFilters();
    }
    else{
      this.fetchFilters();
    }
    this.fetchMovies();
  }

  browseByCinema(): void {
    this.router.navigate(['/cinemas']);
  }
}
