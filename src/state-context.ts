import React from "react";
import { VacationModel } from "./models/Vacation.model";

export interface AppState {
  connectedUserId: number;
  isAdmin: number;
  followedVacationIdsByConnectedUser: number[];
  jwt: string;
  vacations: VacationModel[];
}

interface Context {
  appState: AppState;
  setAppState: (state: Partial<AppState>) => void;
}

export const StateContext = React.createContext<Context>({
  appState: {} as any,
  setAppState: (state: Partial<AppState>) => null,
});
