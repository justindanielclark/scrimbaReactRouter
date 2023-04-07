import Van from "../../../types/Van";
import { useRouteLoaderData } from "react-router-dom";
function Pricing() {
  const data = useRouteLoaderData("rootVan") as Van;
  return (
    <section className="flex flex-col gap-2 my-2">
      <p>
        <span className="font-bold inline mr-2">Price:</span>${data.price}/day
      </p>
    </section>
  );
}

export default Pricing;
