export class Booking {
    id: string;
    booked_at: Date;
    transaction_id: string;
    user_id: string;
    show_id: string;  // this is important becuase if option of cancelling ticket is enabled then the show must also be notified.
    movie_name: string;
    cinema_name: string;
    time: Date;
    seat_info: string[];
  
    constructor(
      id: string,
      transaction_id: string,
      user_id: string,
      show_id: string,
      seat_info: string[],
      booked_at: Date = new Date(),
      movie_name: string = '',
      cinema_name: string = '',
      time: Date = new Date()
    ) {
      this.id = id;
      this.booked_at = booked_at;
      this.transaction_id = transaction_id;
      this.user_id = user_id;
      this.show_id = show_id;
      this.seat_info = seat_info;
      this.movie_name = movie_name;
      this.cinema_name = cinema_name;
      this.time = time;
    }
  }

  // #TODO- implement transactions in a atomic fashion.
  
  