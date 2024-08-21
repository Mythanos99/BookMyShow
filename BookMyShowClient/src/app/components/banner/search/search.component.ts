import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { searchResposne, SearchResults } from 'src/app/models/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  arrMovies: SearchResults[] = [];
  arrCinemas: SearchResults[] = [];
  arrEvents: SearchResults[] = []; 
  hasData: boolean = false;
  loading: boolean = false;
  location: string = '';
  searchQuery: string = '';
  
  private locationSubscription: Subscription = new Subscription();

  constructor(
    private searchService: SearchService, 
    private locationService: LocationService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchComponent>,
  ) {}

  ngOnInit(): void {
    this.locationSubscription.add(
      this.locationService.cityName$.subscribe(city => {
        this.location = city || '';
        if (this.searchQuery.length >= 2) {
          this.performSearch(this.searchQuery);
        } else {
          this.resetResults();
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.locationSubscription.unsubscribe();
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchQuery = query;
    if (query.length >= 2) {
      this.performSearch(query);
    } else {
      this.resetResults();
    }
  }

  private performSearch(query: string): void {
    if (this.location) {
      this.loading = true;
      this.searchService.search(this.location, query).subscribe(
        (response: searchResposne) => {
          this.arrMovies = response.movies || [];
          this.arrCinemas = response.cinemas || [];
          this.arrEvents = response.events || [];
          this.checkDataAvailability();
        },
        error => {
          console.error('Search failed', error);
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  private checkDataAvailability() {
    this.hasData = this.arrMovies.length > 0 ||
                    this.arrCinemas.length > 0 ||
                    this.arrEvents.length > 0;
  }

  private resetResults() {
    this.arrMovies = [];
    this.arrCinemas = [];
    this.arrEvents = [];
    this.hasData = false;
  }

  navigateToDetails(type: 'movie' | 'cinema' | 'event', id: string): void {
    this.dialogRef.close(); 
    if(type === 'movie') {
      this.router.navigate([`/movies/${id}`]);
    }
    else if(type === 'cinema') {
      this.router.navigate([`/buyticketsByCinema/${id}`]);
    }
    else{
      this.router.navigate([`/events/${id}`]);
    }
  }
}
