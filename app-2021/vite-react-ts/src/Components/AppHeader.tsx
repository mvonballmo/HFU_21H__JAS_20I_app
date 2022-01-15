import { useContext } from "react";
import { AppContext } from "../Core/AppContext";

export function AppHeader() {
  const { state, service } = useContext(AppContext);
  const { allMetadata, classMetadata } = state;

  return (
    <>
      <h1>{classMetadata.pluralCaption}</h1>
      <ul>
        {allMetadata.map(m => (
          <li key={m.caption}>
            <a href="#" onClick={() => service.setMetadata(m)}>
              {m.pluralCaption}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
