export class Show {
    id: string;
    movie_id: number;
    sport_id: number;
    play_id: number;
    event_id: number;
    activity_id: number;
    cinema_id: number;
    start_time: Date;
    end_time: Date;
    date: string;
    format: string[];
    seat_info:Seat[];
  
    constructor(
      id: string,
      movie_id: number = 0,
      sport_id: number = 0,
      play_id: number = 0,
      event_id: number = 0,
      activity_id: number = 0,
      cinema_id: number = 0,
      start_time: Date = new Date(),
      end_time: Date = new Date(),
      date: string = '',
      format: string[] = [],
      seat_info:Seat[]=[]
    ) {
      this.id = id;
      this.movie_id = movie_id;
      this.sport_id = sport_id;
      this.play_id = play_id;
      this.event_id = event_id;
      this.activity_id = activity_id;
      this.cinema_id = cinema_id;
      this.start_time = start_time;
      this.end_time = end_time;
      this.date = date;
      this.format = format;
      this.seat_info = seat_info;
    }
  }
export class Seat{
    type:string;
    seat_identity:string
    constructor(
        type:string='',
        seat_identity:string=''
    ){
        this.type=type;
        this.seat_identity=seat_identity;
    }
}
  