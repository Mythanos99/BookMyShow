import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RatingService } from 'src/app/services/rating/rating.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from 'src/app/components/shared/rating-dialog/rating-dialog.component';
import { getimageURl } from 'src/app/utils/util';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId: string | null = null;
  selectedFormat: string | null = 'IMAX';
  location: string | null = null;
  reviews: any[] = [];
  showRatings: boolean = false;
  ratings: any[] = [];
  paginatedRatings: any[] = [];
  ratingsPerPage: number = 5;
  totalRatingsCount: number = 0;
  page: number = 1; // Default page number

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe(
        (movie) => {
          this.movie = movie;
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

  rateNow(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
      data: { movie: this.movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload = {
          entity: 'MOV',
          userId: '66a0a30bea454966838c2793', // #TODO: Replace with dynamic userId
          entityId: this.movieId,
          rating: result.rating,
          review: result.review
        };
        this.ratingService.rateEntity(payload).subscribe(
          (response: any) => {
            console.log('Rating submitted successfully', response);
            this.fetchRating(); // Refresh ratings after submitting
          },
          (error: any) => {
            console.error('Error submitting rating', error);
          }
        );
      }
    });
  }

  likeMovie(): void {
    console.log('Like button clicked');
    // Implement the logic to handle liking the movie here
  }

  isMovieReleased(): boolean {
    const releaseDate = new Date(this.movie.release_date);
    const today = new Date();
    return releaseDate <= today;
  }

  showImage(image: string): string {
    return getimageURl(image);
  }

  fetchRating(pageNo: number = this.page, limit: number = this.ratingsPerPage): void {
    this.ratingService.fetchMovieReviews(this.movieId||'', pageNo, limit).subscribe(
      (response: any) => {
        this.ratings = response.ratings || [];
        this.totalRatingsCount = response.totalRatingsCount || 0;
        console.log(response);
        this.updatePaginatedRatings();
      },
      (error: any) => {
        console.error('Error fetching ratings', error);
      }
    );
  }

  toggleRatings(): void {
    this.showRatings = !this.showRatings;
    if (this.showRatings) {
      this.fetchRating(); // Fetch ratings when showing them
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; // Angular Material paginator uses zero-based index
    this.ratingsPerPage = event.pageSize;
    this.fetchRating(this.page, this.ratingsPerPage);
  }

  updatePaginatedRatings(): void {
    const start = (this.page - 1) * this.ratingsPerPage;
    const end = start + this.ratingsPerPage;
    this.paginatedRatings = this.ratings.slice(start, end);
  }
}

  
// #TODO- add a warning if movie is A rated.
