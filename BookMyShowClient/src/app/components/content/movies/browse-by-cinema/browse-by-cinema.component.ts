import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-by-cinema',
  templateUrl: './browse-by-cinema.component.html',
  styleUrls: ['./browse-by-cinema.component.scss']
})
export class BrowseByCinemaComponent implements OnInit {
  location: string | null = null;
  cinemas: Cinema[] = [];
  page: number = 1;
  limit: number = 4; // #FIXME- change it to later on when data is there
  totalCinemas: number = 5;

  constructor(private locationService: LocationService, private cinemaService: CinemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchCinemas();
    });
  }

  fetchCinemas(): void {
    if (this.location) {
      this.cinemaService.getAllCinemasByLocation(this.location, this.page, this.limit).subscribe(response => {
        this.cinemas = response; // Assuming response contains cinemas array
        // this.totalCinemas = this.cinemas.length;  // #FIXME- get response for the backend for this. Hence need to restructur eht ebackend payload.
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchCinemas();
  }
  buyTicketsByCinema(cinema:any):void{
    this.router.navigate(['/buyticketsByCinema/',cinema._id]);
  }
}