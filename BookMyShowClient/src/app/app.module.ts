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
import { ActivitiesComponent } from './components/content/activities/activities.component';
import { SportsComponent } from './components/content/sports/sports.component';
import { PlaysComponent } from './components/content/plays/plays.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

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
    PageNotFoundComponent,
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,MatCardModule,MatDialogModule,MatFormFieldModule,ReactiveFormsModule,MatButtonModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
