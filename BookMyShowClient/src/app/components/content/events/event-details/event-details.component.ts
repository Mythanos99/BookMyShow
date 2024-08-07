import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from 'src/app/components/shared/rating-dialog/rating-dialog.component';
import { Events } from 'src/app/models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: Events = new Events('',',',0);
  eventId: string | null = null;
  location: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event:Events)=>{
        this.event=event;
        console.log(event);
      }
      );
    }
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
    });
  }

  bookTickets(): void {
    if (this.event) {
      const queryParams = {
        location: this.location,
      };
      this.router.navigate(['/tickets', this.eventId], { queryParams });
    }
  }

  rateNow(): void {
    console.log('Rate now clicked');
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Rating:', result.rating);
        console.log('Review:', result.review);
        // You can send this data to your server here
      }
    });
  }
}
// #TODO- error handling case when say if the id is not present in the database.
