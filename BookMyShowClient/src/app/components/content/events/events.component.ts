import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { unifiedShows } from 'src/app/models/unifiedShows';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Language, Event_category, DateGroup } from 'src/app/constants/filters';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  location: string | null = null;
  Events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategories: string[] = [];
  selectedLanguages: string[] = [];
  selectedDateGroup: string[] = [];
  availableCategories = Event_category;
  availableLanguages = Language;
  availableDateGroup = DateGroup;
  initialLoad = true;
  isDropdownOpen: { [key: string]: boolean } = {
    DateGroup: true,
    language: false,
    category: false
  };

  constructor(private eventService: EventService, private locationService: LocationService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchEvents();
    });
    this.route.queryParams.subscribe(params => {
      if (this.initialLoad) {
        this.initialLoad = false; // Flag to make sure the params from the url are fetched only once.
        this.initializeFiltersFromQueryParams(params);
        this.fetchEvents();
      }
    });
  }

  initializeFiltersFromQueryParams(params: any): void {
    if (params['languages']) {
      this.selectedLanguages = params['languages'].split(',');
    }
    if (params['category']) {
      this.selectedCategories = params['category'].split(',');
    }
    if (params['DateGroup']) {
      this.selectedDateGroup = params['DateGroup'].split(',');
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
    if (type === 'category') {
      this.updateSelectedItems(value, this.selectedCategories, !this.selectedCategories.includes(value));
    } else if (type === 'language') {
      this.updateSelectedItems(value, this.selectedLanguages, !this.selectedLanguages.includes(value));
    } else if (type === 'DateGroup') {
      this.updateSelectedItems(value, this.selectedDateGroup, !this.selectedDateGroup.includes(value));
    }
  }

  applyFilters(): void {
    let queryParams: Params = {};

    if (this.selectedLanguages.length) {
      queryParams['languages'] = this.selectedLanguages.join(',');
    } else {
      queryParams['languages'] = null; // Remove 'languages' from URL if empty
    }

    if (this.selectedCategories.length) {
      queryParams['category'] = this.selectedCategories.join(',');
    } else {
      queryParams['category'] = null; // Remove 'category' from URL if empty
    }

    if (this.selectedDateGroup.length) {
      queryParams['DateGroup'] = this.selectedDateGroup.join(',');
    } else {
      queryParams['DateGroup'] = null; // Remove 'DateGroup' from URL if empty
    }

    // Update the query parameters in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // merge with existing query params
    });

    this.fetchEvents();
  }

  clearFilter(type: string): void {
    if (type === 'category') {
      this.selectedCategories = [];
    } else if (type === 'language') {
      this.selectedLanguages = [];
    } else if (type === 'DateGroup') {
      this.selectedDateGroup = [];
    }
    this.applyFilters(); // Ensure filters are re-applied after clearing
  }

  fetchEvents(): void {
    const queryParams = this.buildQueryParams();
    this.eventService.getFilteredEvent(queryParams).subscribe(events => {
      this.Events = events;
      this.filteredEvents = events;
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
    if (this.selectedCategories.length > 0) {
      params.push(`category=${this.selectedCategories.join('|')}`);
    }
    if (this.selectedDateGroup.length > 0) {
      params.push(`DateGroup=${this.selectedDateGroup.join('|')}`);
    }

    return params.join('&');
  }

  toggleDropdown(type: string): void {
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }

  resetAllFilters(): void {
    this.selectedCategories = [];
    this.selectedLanguages = [];
    this.selectedDateGroup = [];
    this.applyFilters();
  }

  fetchEventDetails(event: any): void {
    this.router.navigate([`/events/${event._id}`]);
  }

  getDateGroupValue(value: string): string {
    if (value === 'Today') return 'Today';
    if (value === 'This Weekend') return 'Weekend';
    return 'nxtWeek';
  }

  getBackDateGroupValue(value: string): string {
    if (value === 'Today') return 'Today';
    if (value === 'Weekend') return 'This Weekend';
    return 'Next Week';
  }
}
