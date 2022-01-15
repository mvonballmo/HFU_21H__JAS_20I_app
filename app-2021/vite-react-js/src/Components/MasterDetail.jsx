import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Core/AppContext";
import { List } from "./List";
import { Detail } from "./Detail";

export function MasterDetail() {
  const { state, service } = useContext(AppContext);
  const { classMetadata } = state;
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    const data = await state.crud.getAll();
    service.setEntities(data);
    setLoading(false);
  }, [classMetadata]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <>
      <nav>
        <button onClick={() => service.createEntity()}>New...</button>
        <List />
      </nav>
      <article>
        <Detail />
      </article>
    </>
  );
}
