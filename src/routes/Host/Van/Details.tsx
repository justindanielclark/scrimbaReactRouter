import { useRouteLoaderData } from "react-router-dom";
import Van from "../../../types/Van";
import capitalize from "../../../utils/capitalize";

function Details() {
  const data = useRouteLoaderData("rootVan") as Van;

  return (
    <section className="flex flex-col gap-2 my-2">
      <p>
        <span className="font-bold inline mr-2">Description:</span>
        {data.description}
      </p>
      <p>
        <span className="font-bold inline mr-2">Visibility:</span>Public
      </p>
    </section>
  );
}

export default Details;
