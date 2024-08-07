import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';
import { LocationService } from 'src/app/sharedservice/location.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from 'src/app/components/shared/rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie= new Movie('','',0,new Date());
  movieId: string| null= null;
  selectedFormat: string | null = 'IMAX';
  location: string | null = null;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router,
    private locationService:LocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe(
        (movie) => {
          this.movie = movie;
          console.log(movie);
        },
        (error) => {
          console.error('Error fetching movie details', error);
        }
      );
    }
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
    });
  }

  bookTickets(): void {
    if (this.movie) {
      const queryParams = {
        format: this.selectedFormat,
        location: this.location,
      };
      this.router.navigate(['/shows', this.movieId], { queryParams });
    }
  }
  rateNow(){
    console.log('Rate now clicked');
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
      data: { movie: this.movie }
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
