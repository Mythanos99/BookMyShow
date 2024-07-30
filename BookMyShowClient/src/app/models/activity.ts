export class Activity {
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  genre: string;
  languages: string[];
  image_url: string;
  public_url: string;

  constructor(
    name: string,
    description: string,
    duration: number,
    rating: number = 0,
    ratedby: number = 0,
    genre: string = '',
    languages: string[] = [],
    image_url: string = '',
    public_url: string = ''
  ) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.genre = genre;
    this.languages = languages;
    this.image_url = image_url;
    this.public_url = public_url;
  }
}
