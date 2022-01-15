import { MouseEvent, useCallback, useContext, useEffect, useRef } from "react";
import { AppContext } from "../Core/AppContext";
import { InputRow } from "./InputRow";

export function Detail() {
  const { state, service } = useContext(AppContext);
  const { classMetadata, entity } = state;
  const saveButton = useRef(null as unknown as HTMLButtonElement);

  const saveEntity = async (e: MouseEvent<HTMLButtonElement>) => {
    await service.saveEntity(state);
    e.preventDefault();
  };

  const deleteEntity = async (e: MouseEvent<HTMLButtonElement>) => {
    await service.deleteEntity(state);
    e.preventDefault();
  };

  const checkValidity = () => {
    saveButton.current?.form?.reportValidity();
  };

  const validate = useCallback(input => (saveButton.current.disabled = !input.form.checkValidity()), []);

  useEffect(() => {
    validate(saveButton.current);
  }, [entity]);

  return !entity ? (
    <div>Nothing selected</div>
  ) : (
    <form>
      {classMetadata.properties.map(p => (
        <InputRow key={p.name} p={p} validate={validate} />
      ))}
      <span>&nbsp;</span>
      <span>
        <button ref={saveButton} onClick={saveEntity}>
          Save
        </button>
        <button disabled={!entity.id} onClick={deleteEntity}>
          Delete
        </button>
        <button onClick={checkValidity}>Check</button>
      </span>
    </form>
  );
}
