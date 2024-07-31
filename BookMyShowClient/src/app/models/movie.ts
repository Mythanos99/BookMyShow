export class Movie {
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  genre: string[];
  languages: string[];
  image_url: string;
  movie_rated:string;
  releaseDate: Date;   // To keep track of upcoming movies.
  likes: number = 0; 

  constructor(
    name: string,
    description: string,
    duration: number,
    releaseDate: Date,
    movie_rated:string='U',
    rating: number = 0,
    ratedby: number = 0,
    genre: string[] = [],
    languages: string[] = [],
    image_url: string = '',
    likes: number = 0
  ) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.genre = genre;
    this.languages = languages;
    this.image_url = image_url;
    this.movie_rated=movie_rated;
    this.releaseDate = releaseDate;
    this.likes = likes;
  }
}

export class Filters{
  languages: string[];
  genres: string[];
  formats: string[];
  constructor(languages: string[], genres: string[], formats: string[]){
    this.languages = languages;
    this.genres = genres;
    this.formats = formats;
  }
}


