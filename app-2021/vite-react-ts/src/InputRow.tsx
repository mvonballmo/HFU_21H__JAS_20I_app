import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "./AppContext";

export function InputRow({ p, validate }) {
  const { state, service } = useContext(AppContext);
  const { entity } = state;

  const inputChange = useCallback(
    e => {
      service.changeEntityData(e.target.id, e.target.value);

      validate(e.target);
    },
    [validate],
  );

  const value = entity[p.name];

  return useMemo(
    () => (
      <>
        <label htmlFor={p.name}>{p.caption}</label>
        <input type={p.type} id={p.name} required placeholder={p.caption} value={value} onInput={inputChange} />
      </>
    ),
    [value, p, inputChange],
  );
}
