import { Event } from "src/models/event";
import { createAction, props } from '@ngrx/store';

export enum EventActionTypes {
  FETCH_EVENT = "[EVENT] Fetch Event",
  FETCH_EVENT_SUCCESS = "[EVENT] Fetch Event Success",
  FETCH_EVENT_FAILURE = "[EVENT] Fetch Event Failed",
  ADD_EVENT = '[EVENT] Add',
  ADD_EVENT_SUCCESS = "[EVENT] Add Event Success",
  ADD_EVENT_FAILURE = "[EVENT] Add Event Failed",
  EDIT_EVENT = '[EVENT] EDIT',
  EDIT_EVENT_SUCCESS = "[EVENT] EDIT Event Success",
  EDIT_EVENT_FAILURE = "[EVENT] EDIT Event Failed",
  DELETE_EVENT = "[EVENT] Delete Event",
  DELTE_EVENT_SUCCESS = "[EVENT] Delete Event Success",
  DELETE_EVENT_FAILURE = "[EVENT] Delete Event Failed",
}

export const FetchEvent = createAction(
    EventActionTypes.FETCH_EVENT
)

export const LoadEventSuccess = createAction(
    EventActionTypes.FETCH_EVENT_SUCCESS,
    props<{ events: Event[] }>()
)

export const LoadEventFailure = createAction(
    EventActionTypes.FETCH_EVENT_FAILURE,
    props<{ error: any }>()
)

export const AddEvent = createAction(
    EventActionTypes.ADD_EVENT,
    props<{ event: Event }>()
)

export const AddEventSuccess = createAction(
    EventActionTypes.ADD_EVENT_SUCCESS,
    props<{ event: Event }>()
)

export const AddEventFailure = createAction(
    EventActionTypes.ADD_EVENT_FAILURE,
    props<{ error: any }>()
)

export const EditEvent = createAction(
    EventActionTypes.EDIT_EVENT,
    props<{ event: Event }>()
)

export const EditEventSuccess = createAction(
    EventActionTypes.EDIT_EVENT_SUCCESS,
    props<{ event: Event }>()
)

export const EditEventFailure = createAction(
    EventActionTypes.EDIT_EVENT_FAILURE,
    props<{ error: any }>()
)

export const DeleteEvent = createAction(
    EventActionTypes.DELETE_EVENT,
    props<{ id: number }>()
)
export const DeleteEventSuccess = createAction(
    EventActionTypes.DELTE_EVENT_SUCCESS,
    props<{ id: number }>()
)
