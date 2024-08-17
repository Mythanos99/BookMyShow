import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-shows',
  templateUrl: './list-shows.component.html',
  styleUrls: ['./list-shows.component.scss']
})
export class ListShowsComponent implements OnInit {
  cinemas: { name: string, id: string }[] = [
    { name: 'Cinema 1', id: '1' },
    { name: 'Cinema 2', id: '2' },
    { name: 'Cinema 3', id: '3' },
    { name: 'Cinema 4', id: '4' },
    { name: 'Cinema 5', id: '5' }
  ];
  movies: { title: string, id: string }[] = [
    { title: 'Movie 1', id: '1' },
    { title: 'Movie 2', id: '2' },
    { title: 'Movie 3', id: '3' },
    { title: 'Movie 4', id: '4' },
    { title: 'Movie 5', id: '5' }
  ];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French'];
  selectedCinemaId: string = '';
  selectedDate: string = '';
  selectedMovieId: string = '';
  showsData: any[] | null = null;
  selectedScreen: number | null = null;
  showStartTime: string = '';
  showEndTime: string = '';
  selectedLanguage: string = 'Hindi'; // Default value
  seatingArrangement: any[] = []; // To store seating arrangement data
  seatNumbers: string[] = []; // To store user input for seat numbers

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  // Mock function to simulate fetching movies
  fetchMovies(): void {
    // Example data
    this.movies = [
      { title: 'Movie 1', id: '1' },
      { title: 'Movie 2', id: '2' },
      { title: 'Movie 3', id: '3' },
      { title: 'Movie 4', id: '4' },
      { title: 'Movie 5', id: '5' }
    ];
  }

  // Mock function to simulate fetching shows based on cinema and date
  onSubmit(): void {
    if (this.selectedCinemaId && this.selectedDate && this.selectedMovieId) {
      this.fetchShows(this.selectedCinemaId, this.selectedDate, this.selectedMovieId);
    }
  }

  // Mock function to fetch shows
  fetchShows(cinemaId: string, date: string, movieId: string): void {
    // Example data
    const mockShowsData = [
      {
        shows: [
          { start_time: "2024-08-16T13:00:00.000Z", end_time: "2024-08-16T15:30:00.000Z" },
          { start_time: "2024-08-16T19:00:00.000Z", end_time: "2024-08-16T21:30:00.000Z" }
        ],
        screen: 2
      },
      {
        shows: [
          { start_time: "2024-08-16T01:30:00.000Z", end_time: "2024-08-16T04:00:00.000Z" }
        ],
        screen: 4
      }
    ];

    this.showsData = mockShowsData;
  }

  // Mock function to simulate fetching seating arrangement based on screen number
  fetchSeatingArrangement(screen: number): void {
    // Example static data
    const mockSeatingArrangement = [
      {
        screens_no: [1, 2, 3, 4],
        seats: [
          { type: "Premium", status: ["0000_00000_000", "0000_00000_000", "0000_00000_000"], price: 350 },
          { type: "Comfort", status: ["0000_00000_000", "0000_00000_000", "0000_00000_000"], price: 300 }
        ]
      },
      {
        screens_no: [5, 6, 7, 8, 9, 10],
        seats: [
          { type: "Comfort", status: ["0000_0000_00", "0000_0000_00", "0000_0000_00", "0000_0000_00"], price: 200 },
          { type: "Economy", status: ["0000_0000_00", "0000_0000_00", "0000_0000_00", "0000_0000_00"], price: 150 }
        ]
      }
    ];

    // Find the arrangement for the selected screen
    this.seatingArrangement = mockSeatingArrangement.find(arrangement => arrangement.screens_no.includes(screen))?.seats || [];
  }

  // Method to handle form submission and fetch the seating arrangement
  onSelectScreen(): void {
    if (this.selectedScreen !== null) {
      this.fetchSeatingArrangement(this.selectedScreen);
    }
  }

  // Method to handle seat number input
  addSeatNumber(seatNumber: string): void {
    if (seatNumber) {
      this.seatNumbers.push(seatNumber);
    }
  }

  // Method to save the selected show
  saveShow(): void {
    if (this.selectedScreen !== null && this.showStartTime && this.showEndTime) {
      const showData = {
        movie_id: this.selectedMovieId,
        cinema_id: this.selectedCinemaId,
        start_time: new Date(this.showStartTime).toISOString(),
        end_time: new Date(this.showEndTime).toISOString(),
        show_date: new Date(this.selectedDate).toISOString(),
        language: this.selectedLanguage,
        format: '2D', // Static value
        genre: ['Drama'], // Static value
        screen: this.selectedScreen,
        seat_info: this.seatNumbers.map(seat => ({
          type: 'Premium', // Example static value, adjust based on actual data
          status: [seat],
          price: 350 // Example static value, adjust based on actual data
        }))
      };
      console.log(showData)
    //   this.http.post('/api/save-show', showData).subscribe(
    //     response => {
    //       console.log('Show data saved successfully:', response);
    //     },
    //     error => {
    //       console.error('Failed to save show data:', error);
    //     }
    //   );
    // } else {
    //   console.log('Please select a screen and enter the show timings.');
    }
  }
}
