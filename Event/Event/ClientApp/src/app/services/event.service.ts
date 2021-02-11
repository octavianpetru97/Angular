import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from 'src/models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getCityList() {
    return this._http.get(this.myAppUrl + 'api/Event/GetCityList')
      .pipe(map(
        response => {
          return response;
        }));
  }

  getEvents() {
    console.log('service called');
    return this._http.get<Event[]>(this.myAppUrl + 'api/Event/Index').pipe(map(
      response => {
        return response;
      }));
  }

  getEventById(id: number) {
    return this._http.get(this.myAppUrl + 'api/Event/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveEvent(event: Event) {
    console.log('service called');
    return this._http.post(this.myAppUrl + 'api/Event/Create', event)
      .pipe(map(
        response => {
          return response;
        }));
  }

  updateEvent(event: Event) {
    return this._http.put(this.myAppUrl + 'api/Event/Edit', event)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteEvent(id: number): Observable<any> {
    return this._http.delete(this.myAppUrl + 'api/Event/Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
}
