import { useContext, useCallback } from "react";
import { AppContext } from "../Core/AppContext";
import { Item } from "./Item";

export function List() {
  const { state } = useContext(AppContext);
  const { entities } = state;

  const logClick = useCallback(() => console.log("selection changed"), []);

  return (
    <ul>
      {entities.map(e => (
        <Item key={e.id ?? 0} entity={e} log={logClick} />
      ))}
    </ul>
  );
}
