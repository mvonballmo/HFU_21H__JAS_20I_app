import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "./AppContext";
import { PropertyMetadata } from "../../common/Metadata";

type InputRowProps = {
  p: PropertyMetadata;
  validate: (e: HTMLElement) => void;
};

export function InputRow({ p, validate }: InputRowProps) {
  const { state, service } = useContext(AppContext);
  const { entity } = state;

  const inputChange = useCallback(
    e => {
      service.changeEntityData(e.target.id, e.target.value);

      validate(e.target);
    },
    [validate],
  );

  const value = entity[p.name] as string;

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
