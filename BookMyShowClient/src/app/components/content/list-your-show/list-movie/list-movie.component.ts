import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie/movie.service';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {
  movieForm: FormGroup;
  genres: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror'];
  languages: string[] = ['Hindi', 'English', 'Spanish', 'French'];
  movie_ratings: string[] = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  minDate: string;
  selectedFile: File | null = null;
  uploadError: string | null = null;

  constructor(private fb: FormBuilder, private movieService: MovieService) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: ['', [Validators.required, Validators.min(30)]],
      genre: [[], Validators.required],
      languages: [[], Validators.required],
      imageUrl: ['', Validators.required],
      movieRated: ['', Validators.required],
      releaseDate: ['', Validators.required]
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.movieForm.get('name')?.value);
      formData.append('description', this.movieForm.get('description')?.value);
      formData.append('duration', this.movieForm.get('duration')?.value);
      formData.append('genre', JSON.stringify(this.movieForm.get('genre')?.value));
      formData.append('languages', JSON.stringify(this.movieForm.get('languages')?.value));
      formData.append('image_url', this.selectedFile);
      formData.append('movie_rated', this.movieForm.get('movieRated')?.value);
      formData.append('release_date', this.movieForm.get('releaseDate')?.value);

      this.movieService.UploadMovie(formData).subscribe(
        (response: any )=> {
          console.log('Upload successful', response);
          this.uploadError = null; // Clear any previous errors
        },
        (error:any) => {
          console.error('Upload failed', error);
          this.uploadError = 'Failed to upload movie. Please try again.';
        }
      );
      // #TODO: Add a snackbar to show success message. Handle the deprecated subscribe method.
    } else {
      this.uploadError = 'Please fill out all required fields and select an image.';
    }
  }

  get formControls() {
    return this.movieForm.controls;
  }
}