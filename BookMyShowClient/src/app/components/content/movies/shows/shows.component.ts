import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from 'src/app/services/show/show.service';
import { LocationService } from 'src/app/sharedservice/location.service';

interface Show {
  _id: string;
  start_time: string;
  seat_info?: { type: string; status:string[];price: number }[]; // Assuming seat info is an array of objects
}

interface Cinema {
  cinema_id: string;
  cinema_name: string;
  location: {
    house_no: string;
    street: string;
    area: string;
    pincode: string;
  };
  shows: Show[];
}

interface DateGroup {
  date: string;
  cinemas: Cinema[];
}

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  format: string = '2D';
  location: string | null = '';
  movieID: string | null = null;
  dateGroups: DateGroup[] = [];

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((params) => {
      this.format = params['format'] || '2D';
      this.location = params['location'] || '';
      this.updateLocation();
    });
  }

  updateLocation(): void {
    if (!this.location) {
      this.locationService.cityName$.subscribe((city) => {
        this.location = city;
        this.updateURL();
        this.fetchShows(); // Fetch shows after setting the location
      });
    } else {
      this.fetchShows();
    }
  }

  fetchShows(): void {
    if (this.movieID) {
      const queryParams = `?format=${this.format}&location=${this.location}`;
      this.showService.getShowsByMovieId(this.movieID, queryParams).subscribe((response: any) => {
        this.dateGroups = response.map((group: any) => ({
          date: group.date,
          cinemas: group.cinemas.map((cinema: any) => ({
            cinema_id: cinema.cinema_id,
            cinema_name: cinema.cinema_name,
            location: cinema.location,
            shows: cinema.shows.map((show: any) => ({
              _id: show._id,
              start_time: show.start_time,
              seat_info: show.seat_info 
            }))
          }))
        }));
        console.log(this.dateGroups);
      });
    }
  }

  getSeatInfo(show: Show): string {
    console.log(show);
    return show.seat_info
      ? show.seat_info.map(seat => `${seat.type}: ${seat.price}`).join('\n')
      : 'No seat information available';
  }

  updateURL(): void {
    const queryParams = {
      format: this.format,
      location: this.location,
    };
    this.router.navigate([], { queryParams });
  }
  onShowSelect(show: any): void {
    this.router.navigate(['/book-tickets', show._id]);
  }
  // #BUG- The data returned from the shows data does not feature seat_info
}
