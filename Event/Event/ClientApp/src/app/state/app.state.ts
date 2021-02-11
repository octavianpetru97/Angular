import { EventState } from "./reducers/event.reducer";

export interface AppState {
    readonly event: EventState;
}

