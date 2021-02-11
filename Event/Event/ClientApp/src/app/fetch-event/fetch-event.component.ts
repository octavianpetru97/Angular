import { Component, OnInit } from '@angular/core';
import { Event } from 'src/models/event';
import { Store, select } from "@ngrx/store";
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { FetchEvent, DeleteEvent } from 'src/app/state/actions/event.actions';
import { getEvents } from 'src/app/state/reducers/event.reducer';

@Component({
  selector: 'app-fetch-event',
  templateUrl: './fetch-event.component.html',
  styleUrls: ['./fetch-event.component.css']
})
export class FetchEventComponent implements OnInit {

  loading$: Observable<Boolean>;
  error$: Observable<Error>

  public eveList: Observable<Event[]>;

  temp: Event[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(FetchEvent());
    this.eveList = this.store.pipe(select(getEvents));
    this.loading$ = this.store.select(store => store.event.loading);
  }

  delete(eventID) {
    const ans = confirm('Do you want to delete event with Id: ' + eventID);
    if (ans) {
      this.store.dispatch(DeleteEvent({ id: eventID }));
    }
  }
}
