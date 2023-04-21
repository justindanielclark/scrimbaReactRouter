import Van from "../../types/Van";
import { useLoaderData } from "react-router-dom";
import VanListItem from "../../components/VanListItem";
import API from "../../api/API";
import { requireAuth } from "../../utils/requireAuth";

async function loader() {
  //TODO: Currently Hardcoded Search For Host '123'
  requireAuth();
  return API.getHostVans("123");
}

export default function Vans() {
  const data = useLoaderData() as Array<Van>;
  return (
    <section className="p-3">
      {data.length > 0 ? (
        <>
          <h1 className="font-bold text-xl">Your listed vans:</h1>
          <ul className="flex flex-col gap-4">
            {data.map((van) => (
              <VanListItem key={van.id} van={van} />
            ))}
          </ul>
        </>
      ) : (
        <p>{/*TODO: Generate a notice that no van data has been found */}</p>
      )}
    </section>
  );
}

export { loader };
