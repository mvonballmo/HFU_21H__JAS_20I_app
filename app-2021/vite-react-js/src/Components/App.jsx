import { AppContext } from "../Core/AppContext";
import { AppService } from "../../../common/AppService.d.ts";
import { createInitialState, reducer } from "../../../common/appFunctions.d.ts";
import { useReducer } from "react";
import { AppHeader } from "./AppHeader";
import { MasterDetail } from "./MasterDetail";
import "../../../reset.css";
import "../../../styles.css";

function App() {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const service = new AppService(dispatch);

  return (
    <AppContext.Provider value={{ state, service }}>
      <header>
        <AppHeader />
      </header>
      <main>
        <MasterDetail />
      </main>
    </AppContext.Provider>
  );
}

export default App;
