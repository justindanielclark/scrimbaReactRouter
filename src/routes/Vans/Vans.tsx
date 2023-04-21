import { redirect, useLoaderData, useSearchParams } from "react-router-dom";
import API from "../../api/API";
import Van from "../../types/Van";
import searchParamDeconstructor, {
  SearchParamLiteral,
} from "../../utils/searchParamDeconstructor";
import VanProductCard from "./VanProductCard";

const filterTypes = ["simple", "rugged", "luxury"] as const;

type chosenFilterType = { [Key in (typeof filterTypes)[number]]: boolean };

async function loader() {
  return API.getVans();
}
function createChosenFilters(
  deconstructedSearchParams: SearchParamLiteral | null
): chosenFilterType {
  if (deconstructedSearchParams) {
    if (
      deconstructedSearchParams.type &&
      Array.isArray(deconstructedSearchParams.type)
    ) {
      return {
        simple: deconstructedSearchParams.type.includes("simple")
          ? true
          : false,
        rugged: deconstructedSearchParams.type.includes("rugged")
          ? true
          : false,
        luxury: deconstructedSearchParams.type.includes("luxury")
          ? true
          : false,
      };
    }
  }
  return {
    simple: false,
    rugged: false,
    luxury: false,
  };
}
function filterVans(
  vans: Array<Van>,
  chosenFilters: chosenFilterType
): Array<Van> {
  if (!chosenFilters.luxury && !chosenFilters.rugged && !chosenFilters.simple) {
    return vans.map((van) => van);
  }
  return vans.filter((van) => chosenFilters[van.type]);
}
function showClearFilterButton(chosenFilters: chosenFilterType): boolean {
  return chosenFilters.simple || chosenFilters.rugged || chosenFilters.luxury;
}
export default function Vans() {
  const data = useLoaderData() as { vans: Array<Van> };
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilters = searchParamDeconstructor(searchParams.toString());
  const chosenFilters: chosenFilterType = createChosenFilters(typeFilters);
  const displayedVans = filterVans(data.vans, chosenFilters);

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
                if (typeFilters && typeFilters.type) {
                  if (typeFilters.type.includes("simple")) {
                    setSearchParams({
                      type: [
                        ...typeFilters.type.filter((type) => type !== "simple"),
                      ],
                    });
                  } else {
                    setSearchParams({ type: [...typeFilters.type, "simple"] });
                  }
                } else {
                  setSearchParams({ type: ["simple"] });
                }
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
                if (typeFilters && typeFilters.type) {
                  if (typeFilters.type.includes("rugged")) {
                    setSearchParams({
                      type: [
                        ...typeFilters.type.filter((type) => type !== "rugged"),
                      ],
                    });
                  } else {
                    setSearchParams({ type: [...typeFilters.type, "rugged"] });
                  }
                } else {
                  setSearchParams({ type: ["rugged"] });
                }
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
                if (typeFilters && typeFilters.type) {
                  if (typeFilters.type.includes("luxury")) {
                    setSearchParams({
                      type: [
                        ...typeFilters.type.filter((type) => type !== "luxury"),
                      ],
                    });
                  } else {
                    setSearchParams({ type: [...typeFilters.type, "luxury"] });
                  }
                } else {
                  setSearchParams({ type: ["luxury"] });
                }
              }}
            />
          </label>
          {showClearFilterButton(chosenFilters) ? (
            <button
              className="hover:bg-neutral-300 rounded"
              onClick={() => {
                setSearchParams({});
              }}
            >
              Clear Filters
            </button>
          ) : undefined}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data.vans.length === 0 ? (
            <p>Unable to Load Vans</p>
          ) : (
            displayedVans.map((van) => (
              <VanProductCard
                van={van}
                key={van.id}
                chosenFilters={chosenFilters}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export type { chosenFilterType };
export { loader };
