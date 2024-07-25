export class Movie {
  id: string;
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  genre: string[];
  languages: string[];
  image_url: string;
  mvoie_rated:string;

  // #TODO: Add active tab to show currently active movies.
  constructor(
    id: string,
    name: string,
    description: string,
    duration: number,
    movie_rated:string='U',
    rating: number = 0,
    ratedby: number = 0,
    genre: string[] = [],
    languages: string[] = [],
    image_url: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.genre = genre;
    this.languages = languages;
    this.image_url = image_url;
    this.mvoie_rated=movie_rated;
  }
}


