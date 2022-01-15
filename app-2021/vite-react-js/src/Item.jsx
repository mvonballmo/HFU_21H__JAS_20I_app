import { useContext, useCallback, useMemo } from "react";
import { AppContext } from "./AppContext";

export function Item({ entity, log }) {
  const { state, service } = useContext(AppContext);
  const { classMetadata, entity: selectedEntity } = state;

  const isSelected = entity.id === selectedEntity?.id;

  const onClick = useCallback(() => {
    log();
    service.setEntity(entity);
  }, [log]);

  return useMemo(
    () => (
      <>
        <a className={isSelected ? "selected" : ""} href="#" onClick={onClick}>
          {classMetadata.getTitle(entity)}
        </a>
      </>
    ),
    [isSelected, entity, classMetadata, onClick],
  );
}
