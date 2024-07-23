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
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/content/home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MoviesComponent } from './components/content/movies/movies.component';
import { EventsComponent } from './components/content/events/events.component';
import { ActivitiesComponent } from './components/content/activities/activities.component';
import { SportsComponent } from './components/content/sports/sports.component';
import { PlaysComponent } from './components/content/plays/plays.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
    ActivitiesComponent,
    SportsComponent,
    PlaysComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
