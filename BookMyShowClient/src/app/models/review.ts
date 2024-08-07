export class Review{
    id: string;
    user_id: string;
    movieOrEvent_id: string;
    rating: number;
    review: string;
    created_at: Date;
    
    constructor(
        id: string,
        user_id: string,
        movieOrEvent_id: string,
        rating: number,
        review: string='',
        created_at: Date=new Date()
    ) {
        this.id = id;
        this.user_id = user_id;
        this.movieOrEvent_id = movieOrEvent_id;
        this.rating = rating;
        this.review = review;
        this.created_at = created_at;
    }
}