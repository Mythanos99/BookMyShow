import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { MoviesComponent } from './components/content/movies/movies.component';
import { EventsComponent } from './components/content/events/events.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './components/content/movies/movie-details/movie-details.component';
import { ShowsComponent } from './components/content/movies/shows/shows.component';
import { BookSeatsComponent } from './components/content/movies/book-seats/book-seats.component';
import { EventDetailsComponent } from './components/content/events/event-details/event-details.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user/user-bookings/user-bookings.component';
import { BrowseByCinemaComponent } from './components/content/movies/browse-by-cinema/browse-by-cinema.component';
import { BuyTicketsComponent } from './components/content/movies/browse-by-cinema/buy-tickets/buy-tickets.component';
import { ListYourShowComponent } from './components/content/list-your-show/list-your-show.component';
import { ListMovieComponent } from './components/content/list-your-show/list-movie/list-movie.component';
import { ListCinemaComponent } from './components/content/list-your-show/list-cinema/list-cinema.component';
import { ListShowsComponent } from './components/content/list-your-show/list-shows/list-shows.component';
import { BookTicketsComponent } from './components/content/events/book-tickets/book-tickets.component';
import { ListEventsComponent } from './components/content/list-your-show/list-events/list-events.component';
import { MainPageComponent } from './components/content/list-your-show/main-page/main-page.component';
import { AdminComponent } from './components/content/admin/admin.component';
import { BusinessGuard, LoginGuard } from './guard/admin.guard';

const routes: Routes = [
  // #TODO change it to location and add lazy loading. Individual routing for features like movies
  { path: '', component: MoviesComponent },
  { path: 'home', component: MoviesComponent },
  { path: 'admin', component: AdminComponent ,canActivate:[LoginGuard]},
  { path: 'movies', component: MoviesComponent},
  { path: 'movies/:id', component: MovieDetailsComponent},
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'cinemas', component: BrowseByCinemaComponent},
  { path: 'buyticketsByCinema/:id', component: BuyTicketsComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: 'shows/:id', component: ShowsComponent},
  { path: 'book-tickets/:id', component: BookSeatsComponent},
  { path: 'book-event-tickets/:id', component: BookTicketsComponent},
  { path: 'my-profile', component:UserProfileComponent,canActivate:[LoginGuard]},
  { path: 'my-bookings', component:UserBookingsComponent,canActivate:[LoginGuard]},
  { path: 'list-shows', component:ListYourShowComponent},
  { path: 'list-shows/movie', component:ListMovieComponent,canActivate:[BusinessGuard]},
  { path: 'list-shows/cinema', component:ListCinemaComponent,canActivate:[BusinessGuard]},
  { path: 'list-shows/shows', component:ListShowsComponent,canActivate:[BusinessGuard]},
  { path: 'list-shows/events', component:ListEventsComponent,canActivate:[BusinessGuard]},
  { path: 'list-shows/home', component:MainPageComponent,canActivate:[BusinessGuard]},






  { path: '**', redirectTo: '404' }
];
// #TODO- add route guards to these routes.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
