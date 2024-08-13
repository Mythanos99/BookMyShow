import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { MoviesComponent } from './components/content/movies/movies.component';
import { EventsComponent } from './components/content/events/events.component';
import { SportsComponent } from './components/content/sports/sports.component';
import { ActivitiesComponent } from './components/content/activities/activities.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaysComponent } from './components/content/plays/plays.component';
import { MovieDetailsComponent } from './components/content/movies/movie-details/movie-details.component';
import { ShowsComponent } from './components/content/movies/shows/shows.component';
import { BookSeatsComponent } from './components/content/movies/book-seats/book-seats.component';
import { EventDetailsComponent } from './components/content/events/event-details/event-details.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user/user-bookings/user-bookings.component';
import { BrowseByCinemaComponent } from './components/content/movies/browse-by-cinema/browse-by-cinema.component';
import { BuyTicketsComponent } from './components/content/movies/browse-by-cinema/buy-tickets/buy-tickets.component';

const routes: Routes = [
  // #TODO change it to location and add lazy loading. Individual routing for features like movies
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent},
  { path: 'movies/:id', component: MovieDetailsComponent},
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'sports', component: SportsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'plays', component: PlaysComponent },
  { path: 'cinemas', component: BrowseByCinemaComponent},
  { path: 'buyticketsByCinema/:id', component: BuyTicketsComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: 'shows/:id', component: ShowsComponent},
  { path: 'book-tickets/:id', component: BookSeatsComponent},
  { path: 'my-profile', component:UserProfileComponent},
  { path: 'my-bookings', component:UserBookingsComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
