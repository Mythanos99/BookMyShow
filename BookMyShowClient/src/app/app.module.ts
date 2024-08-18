import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent } from './components/shared/location/location.component';
import { HomeComponent } from './components/content/home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MoviesComponent } from './components/content/movies/movies.component';
import { EventsComponent } from './components/content/events/events.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SearchComponent } from './components/banner/search/search.component';
import { MovieDetailsComponent } from './components/content/movies/movie-details/movie-details.component';
import { ShowsComponent } from './components/content/movies/shows/shows.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookSeatsComponent } from './components/content/movies/book-seats/book-seats.component';
import { SplitPipe } from './pipes/split.pipe';
import { FormsModule } from '@angular/forms';
import { SelectSeatsNumberComponent } from './components/content/movies/dialog/select-seats-number/select-seats-number.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentGatewayComponent } from './components/content/movies/payment-gateway/payment-gateway.component';
import { RatingDialogComponent } from './components/shared/rating-dialog/rating-dialog.component'; 
import {MatSliderModule} from '@angular/material/slider';
import { EventDetailsComponent } from './components/content/events/event-details/event-details.component';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserBookingsComponent } from './components/user/user-bookings/user-bookings.component';
import { BrowseByCinemaComponent } from './components/content/movies/browse-by-cinema/browse-by-cinema.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BuyTicketsComponent } from './components/content/movies/browse-by-cinema/buy-tickets/buy-tickets.component';
import { ListYourShowComponent } from './components/content/list-your-show/list-your-show.component';
import { ListMovieComponent } from './components/content/list-your-show/list-movie/list-movie.component';
import {MatSelectModule} from '@angular/material/select';
import { ListCinemaComponent } from './components/content/list-your-show/list-cinema/list-cinema.component';
import {MatRadioModule} from '@angular/material/radio';
import { ListShowsComponent } from './components/content/list-your-show/list-shows/list-shows.component';
import { TimeagoModule } from 'ngx-timeago';
import {MatIconModule} from '@angular/material/icon';
import { BookTicketsComponent } from './components/content/events/book-tickets/book-tickets.component';
import { PaymentGatewayEventComponent } from './components/content/events/payment-gateway-event/payment-gateway-event.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListEventsComponent } from './components/content/list-your-show/list-events/list-events.component';
import {MatChipsModule} from '@angular/material/chips';
import { MainPageComponent } from './components/content/list-your-show/main-page/main-page.component';
import { AdminComponent } from './components/content/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    LocationComponent,
    LoginComponent,
    HomeComponent,
    MoviesComponent,
    EventsComponent,
    PageNotFoundComponent,
    AuthComponent,
    RegisterComponent,
    SearchComponent,
    MovieDetailsComponent,
    ShowsComponent,
    BookSeatsComponent,
    SplitPipe,
    SelectSeatsNumberComponent,
    PaymentGatewayComponent,
    RatingDialogComponent,
    EventDetailsComponent,
    UserProfileComponent,
    UserBookingsComponent,
    BrowseByCinemaComponent,
    BuyTicketsComponent,
    ListYourShowComponent,
    ListMovieComponent,
    ListCinemaComponent,
    ListShowsComponent,
    BookTicketsComponent,
    PaymentGatewayEventComponent,
    ListEventsComponent,
    MainPageComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,MatCardModule,MatDialogModule,MatFormFieldModule,ReactiveFormsModule,MatButtonModule,HttpClientModule,
    MatTooltipModule,FormsModule,MatSnackBarModule,MatSliderModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    MatPaginatorModule,MatSelectModule,MatRadioModule,TimeagoModule.forRoot(),MatIconModule,MatStepperModule,MatCheckboxModule,MatChipsModule,
    MatTableModule,MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
