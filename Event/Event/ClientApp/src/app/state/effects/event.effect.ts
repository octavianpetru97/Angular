import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EventService } from "src/app/services/event.service";
import { mergeMap, map, catchError, tap, switchMap } from "rxjs/operators";
import {
    LoadEventSuccess, FetchEvent, AddEvent, AddEventSuccess,
    DeleteEvent, DeleteEventSuccess, EditEvent, EditEventSuccess,
    LoadEventFailure, AddEventFailure, EditEventFailure
} from "src/app/state/actions/event.actions";
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class EventEffect {
    constructor(
        private actions$: Actions,
        private _eventService: EventService,
        private _router: Router,
    ) { }

    loadEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchEvent),
            switchMap(() =>
                this._eventService.getEvents().pipe(
                    map((events) => LoadEventSuccess({ events })),
                    catchError(error => of(LoadEventFailure({ error })))
                )
            )
        ),
    )

    addEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddEvent),
            mergeMap(({ event }) =>
                this._eventService.saveEvent(event).pipe(
                    map(() => AddEventSuccess({ event })),
                    tap(() => this._router.navigate(['/fetch-event'])),
                    catchError(error => of(AddEventFailure({ error })))
                ),
            )
        )
    )

    editEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditEvent),
            mergeMap(({ event }) =>
                this._eventService.updateEvent(event).pipe(
                    map(() => EditEventSuccess({ event })),
                    tap(() => this._router.navigate(['/fetch-event'])),
                    catchError(error => of(EditEventFailure({ error })))
                ),
            )
        )
    )

    deleteEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteEvent),
            mergeMap(({ id }) =>
                this._eventService.deleteEvent(id).pipe(
                    map(() => DeleteEventSuccess({ id })),
                )
            ),
        )
    )
}
