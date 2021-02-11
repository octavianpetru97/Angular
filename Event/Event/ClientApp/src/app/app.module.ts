import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchEventComponent } from './fetch-event/fetch-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { eventReducer, reducer } from './state/reducers/event.reducer';
import { Event } from 'src/models/event';
import { DisplayEventComponent } from './display-event/display-event.component';
import { EffectsModule } from '@ngrx/effects';
import { EventEffect } from './state/effects/event.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromEvent from 'src/app/state/reducers/event.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DisplayEventComponent,
    FetchEventComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      event: reducer
    }),
    EffectsModule.forRoot([EventEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'fetch-event', component: FetchEventComponent },
      { path: 'register-event', component: AddEventComponent },
      { path: 'display-event', component: DisplayEventComponent },
      { path: 'event/edit/:id', component: AddEventComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
