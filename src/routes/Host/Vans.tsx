import Van from "../../types/Van";
import { useLoaderData, defer, Await } from "react-router-dom";
import VanListItem from "../../components/VanListItem";
import API from "../../api/API";
import { requireAuth } from "../../utils/requireAuth";
import { Suspense } from "react";

async function loader() {
  //TODO: Currently Hardcoded Search For Host '123'
  requireAuth();
  return defer({ vans: API.getHostVans("123") });
}

export default function Vans() {
  const data = useLoaderData() as { vans: Promise<Array<Van>> };
  return (
    <section className="p-3">
      <Suspense fallback={<p>Loading Vans...</p>}>
        <Await resolve={data.vans}>
          {(vans) => {
            return (
              <>
                {vans.length > 0 ? (
                  <>
                    <h1 className="font-bold text-xl">Your listed vans:</h1>
                    <ul className="flex flex-col gap-4">
                      {(vans as Array<Van>).map((van) => (
                        <VanListItem key={van.id} van={van} />
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>
                    {/*TODO: Generate a notice that no van data has been found */}
                  </p>
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

export { loader };
