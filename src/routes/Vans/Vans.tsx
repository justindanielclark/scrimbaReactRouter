import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Van from "../../types/Van";
import VanProductCard from "./VanProductCard";

type chosenFilterType = {
  simple: boolean;
  luxury: boolean;
  rugged: boolean;
};

async function loader(): Promise<{ vans: Array<Van> }> {
  return fetch("/api/vans/").then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error("Unable To Retrieve API Data");
  });
}

export default function Vans() {
  const data = useLoaderData() as { vans: Array<Van> };
  const [chosenFilters, setChosenFilter] = useState<chosenFilterType>({
    simple: true,
    luxury: true,
    rugged: true,
  });
  return (
    <main className="flex-1 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-bold text-xl my-6 mx-4">
          Explore our van options:
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-4 gap-2 xs:gap-4 px-3">
          <label
            className={`rounded-lg basis-full text-center py-1 cursor-pointer ${
              chosenFilters.simple
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-yellow-100 hover:bg-yellow-200 text-black"
            }`}
            htmlFor="simpleFilter"
          >
            Simple
            <input
              readOnly={true}
              checked={chosenFilters.simple}
              type="checkbox"
              name="simpleFilter"
              id="simpleFilter"
              className="h-0 w-0 hidden"
              onClick={() => {
                setChosenFilter((x) => {
                  return {
                    ...x,
                    simple: !x.simple,
                  };
                });
              }}
            />
          </label>
          <label
            className={`rounded-lg basis-full text-center py-1 cursor-pointer ${
              chosenFilters.rugged
                ? "bg-green-800 hover:bg-green-900 text-white"
                : "bg-yellow-100 hover:bg-yellow-200 text-black"
            }`}
            htmlFor="ruggedFilter"
          >
            Rugged
            <input
              readOnly={true}
              checked={chosenFilters.rugged}
              type="checkbox"
              name="ruggedFilter"
              id="ruggedFilter"
              className="h-0 w-0 hidden"
              onClick={() => {
                setChosenFilter((x) => {
                  return {
                    ...x,
                    rugged: !x.rugged,
                  };
                });
              }}
            />
          </label>

          <label
            className={`rounded-lg basis-full text-center py-1 cursor-pointer ${
              chosenFilters.luxury
                ? "bg-neutral-800 hover:bg-neutral-900 text-white"
                : "bg-yellow-100 hover:bg-yellow-200 text-black"
            }`}
            htmlFor="luxuryFilter"
          >
            Luxury
            <input
              readOnly={true}
              checked={chosenFilters.luxury}
              type="checkbox"
              name="luxuryFilter"
              id="luxuryFilter"
              className="h-0 w-0 hidden"
              onClick={() => {
                setChosenFilter((x) => {
                  return {
                    ...x,
                    luxury: !x.luxury,
                  };
                });
              }}
            />
          </label>

          <button
            className="hover:bg-neutral-300 rounded"
            onClick={() => {
              setChosenFilter({
                simple: true,
                luxury: true,
                rugged: true,
              });
            }}
          >
            Clear Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data.vans.length === 0 ? (
            <p>Unable to Load Vans</p>
          ) : (
            data.vans
              .filter((van) => chosenFilters[van.type])
              .map((van) => <VanProductCard van={van} key={van.id} />)
          )}
        </div>
      </div>
    </main>
  );
}

export { loader };
