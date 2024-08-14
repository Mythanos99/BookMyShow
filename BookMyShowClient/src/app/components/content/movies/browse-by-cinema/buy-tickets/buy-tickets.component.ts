import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { map } from 'rxjs/operators';

// Define interfaces for type safety
interface Show {
  _id: string;
  start_time: string;
  end_time: string;
  format: string;
  language: string;
  genre: string[];
  seat_info: SeatInfo[];
}

interface SeatInfo {
  type: string;
  status: string | string[];
  price: number;
}

interface Movie {
  movie_id: string;
  shows: Show[];
}

interface DateGroup {
  _id: string; // Ensure it is a string after processing
  movies: Movie[];
}

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss'],
})
export class BuyTicketsComponent implements OnInit {
  dateGroups: DateGroup[] = [];

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCinemaDetails();
  }


  
  // In your component
  fetchCinemaDetails(): void {
    const cinemaId = this.route.snapshot.paramMap.get('id');
    if (cinemaId) {
      this.cinemaService.getMoviesByCinemaId(cinemaId).subscribe((data: DateGroup[]) => {
        // Default invalid/null dates to a placeholder string
        this.dateGroups = data.map(group => ({
          ...group,
          _id: group._id || 'Invalid Date' // Provide a fallback value
        }));
        console.log(this.dateGroups);
      });
    }
  }

  // Format seat info for tooltip display
  getSeatInfo(show: Show): string {
    return show.seat_info
      .map((seat) => `${seat.type}: Rs ${seat.price}`)
      .join(', ');
  }

  onShowSelect(show: Show): void {
    this.router.navigate(['/book-tickets', show._id]);
  }
}
