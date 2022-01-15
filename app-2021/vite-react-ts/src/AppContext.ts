import { createContext } from "react";
import { AppService } from "../../common/AppService";
import { AppState } from "../../common/AppState";

type TAppContext = {
  state: AppState;
  service: AppService;
};

export const AppContext = createContext<TAppContext>(null as unknown as TAppContext);
