import { Component, OnInit } from '@angular/core';
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
  isDropdownOpen: { [key: string]: boolean } = {
    language: false,
    genre: false,
    format: false
  };

  constructor(private movieService: MovieService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchMovies();
    });
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

  applyFilters(): void {
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
    this.applyFilters();
  }

  fetchMovies(): void {
    const queryParams = this.buildQueryParams();
    this.movieService.getFilteredMovies(queryParams).subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  buildQueryParams(): string {
    const params = [];

    if (this.location) {
      params.push(`location=${this.location}`);
    }
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
}
