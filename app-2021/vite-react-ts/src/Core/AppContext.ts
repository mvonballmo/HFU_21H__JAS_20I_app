import { createContext } from "react";
import { AppService } from "./AppService";
import { AppState } from "./AppState";

type TAppContext = {
  state: AppState;
  service: AppService;
};

export const AppContext = createContext<TAppContext>(null as unknown as TAppContext);
