import { Review } from "./review";

export class Events {
  id?: string;
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  genre: string;
  languages: string[];
  image_url: string;
  reviews: Review[];

  constructor(
    name: string,
    description: string,
    duration: number,
    rating: number = 0,
    ratedby: number = 0,
    genre: string = '',
    languages: string[] = [],
    image_url: string = '',
    reviews: Review[] = [] 
  ) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.genre = genre;
    this.languages = languages;
    this.image_url = image_url;
    this.reviews = reviews;
  }
}
// #TODO- in this model check if _id is needed to be defined.
// #TODO- I think it will be better to have separate model for eventResponse and EventRequest
