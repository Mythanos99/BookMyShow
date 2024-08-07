export class Sport {
  id: string;
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  category: string;
  image_url: string;

  constructor(
    id: string,
    name: string,
    description: string,
    duration: number,
    rating: number = 0,
    ratedby: number = 0,
    category: string = '',
    languages: string[] = [],
    image_url: string = '',
    public_url: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.category = category;
    this.image_url = image_url;
  }
}
