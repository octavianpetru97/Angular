import { Event } from "src/models/event";
import * as EventActions from 'src/app/state/actions/event.actions';
import { createSelector, createReducer, on } from "@ngrx/store";
import { Action } from "@ngrx/store/src/models";
import { AppState } from "../app.state";

export interface EventState {
    list: Event[],
    loading: boolean,
    error: Error
}

export const initialState = {
    list: [],
    loading: false,
    error: undefined
};

export const eventReducer = createReducer(
    initialState,
    on(EventActions.FetchEvent, state => (console.log('fetch reducer called'), {
        ...state,
        loading: true,

    })),
    on(EventActions.LoadEventSuccess, (state, { events }) => (
        (console.log('LoadEventSuccess reducer called'),
            {
                ...state,
                list: events,
                loading: false
            })),
    ),

    on(EventActions.LoadEventFailure, (state, { error }) => (
        (console.log('LoadEventSuccess reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EventActions.AddEvent, state =>
        (console.log('AddEvent reducer called'), {
            ...state,
            loading: true,
        })),

    on(EventActions.AddEventSuccess, (state, { event }) =>
        (console.log('AddEventSuccess reducer called'), {
            ...state,
            list: [...state.list, event],
            loading: false,
        })),

    on(EventActions.AddEventFailure, (state, { error }) => (
        (console.log('AddEventFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EventActions.EditEvent, state =>
        (console.log('EditEvent reducer called'), {
            ...state,
            loading: true,
        })),

    on(EventActions.EditEventSuccess, (state, { event }) => ({
        ...state,
        list: [...state.list, event],
        loading: false,
    })),

    on(EventActions.EditEventFailure, (state, { error }) => (
        (console.log('EditEventFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EventActions.DeleteEvent, state =>
        (console.log('DeleteEvent reducer called'), {
            ...state,
            loading: true,

        })),

    on(EventActions.DeleteEventSuccess, (state, { id }) =>
        (console.log('DeleteEventSuccess reducer called'), {
            ...state,
            list: state.list.filter(item => item.eventId !== id),
            loading: false,
        })),
);

export function reducer(state: EventState | undefined, action: Action) {
    return eventReducer(state, action);
}

const getEventFeatureState = (state: AppState) => state.event;

export const getEvents = createSelector(
    getEventFeatureState,
    (state: EventState) => state.list
);
