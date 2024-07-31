import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie= new Movie('','',0,new Date());

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe(
        (movie) => {
          this.movie = movie;
        },
        (error) => {
          console.error('Error fetching movie details', error);
        }
      );
    }
  }

  bookTickets(): void {
    // if (this.movie) {
    //   this.router.navigate(['/book', this.movie.id]); // Adjust the route as needed
    // }
  }
}
