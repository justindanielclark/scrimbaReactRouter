import Van from "../../types/Van";
import Host from "../../types/Host";
import Review from "../../types/Review";

import { NavLink, useLoaderData } from "react-router-dom";
import VanListItem from "../../components/VanListItem";

async function loader() {
  //TODO: Currently Hardcoded Search For Host '123'
  return fetch("/api/hosts/123/details").then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error("Unable To Retrieve API Data");
  });
}

export default function Details() {
  const data = useLoaderData() as {
    hostData: Host;
    reviews: Array<Review>;
    vans: Array<Van>;
  };
  const income = parseFloat(
    data.hostData.last30Income.toFixed(2)
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      {/* INCOME */}
      <section className="flex flex-row items-center bg-neutral-50 p-4 flex-wrap gap-1 justify-end">
        <div className="flex-1">
          <h1 className="text-2xl font-bold my-2">Welcome!</h1>
          <p className="my-2 text-neutral-600 whitespace-nowrap">
            Income last <span className="underline">30 days</span>
          </p>
          <p className="text-3xl font-bold my-2">{income}</p>
        </div>
        <NavLink
          to={"/host/income"}
          className="py-1 px-2 bg-teal-800 text-white font-bold rounded h-fit basis-auto text-sm"
        >
          Details
        </NavLink>
      </section>
      {/* Review */}

      {data.reviews.length > 0 ? (
        <section className="flex flex-row bg-orange-100 p-4 flex-wrap gap-1 justify-end">
          <p className="flex-1">
            <span className="inline-block text-xl font-bold mr-2 whitespace-nowrap">
              Review Score:
            </span>
            <span className="font-bold whitespace-nowrap">
              🌟{" "}
              {(
                data.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
                data.reviews.length
              ).toFixed(1)}
            </span>
            /5.0
          </p>
          <NavLink
            to="/host/reviews"
            className="py-1 px-2 bg-teal-800 text-white font-bold rounded h-fit basis-auto text-sm"
          >
            Details
          </NavLink>{" "}
        </section>
      ) : undefined}

      {/* Your Listed Vans */}
      <section className="bg-orange-200 flex-1 p-4">
        <div className="flex flex-row flex-wrap gap-1 justify-end">
          <p className="text-xl font-bold flex-1 whitespace-nowrap">
            Your Listed Vans:
          </p>
          <NavLink
            to="/host/vans"
            className="py-1 px-2 bg-teal-800 font-bold text-white rounded h-fit basis-auto text-sm"
          >
            View All
          </NavLink>
        </div>
        <ul className="flex flex-col gap-2 mt-4">
          {data.vans.map((van) => {
            return <VanListItem van={van} />;
          })}
        </ul>
      </section>
    </>
  );
}

export { loader };
