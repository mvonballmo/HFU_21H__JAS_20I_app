import { useContext, useCallback, useMemo } from "react";
import { AppContext } from "./AppContext";
import { Entity } from "./Metadata";

type ItemProps = {
  entity: Entity;
  log: () => void;
};

export function Item({ entity, log }: ItemProps) {
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
