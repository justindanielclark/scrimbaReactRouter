import { Link } from "react-router-dom";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useLocation,
} from "react-router-dom";
import Van from "../../types/Van";
import VanTypeNotif from "../../components/VanTypeNotif";
import vanTypeColoring from "../../utils/vanTypeColoring";
import { chosenFilterType } from "../Vans/Vans";
import capitalize from "../../utils/capitalize";
import API from "../../api/API";

async function loader({ params }: LoaderFunctionArgs) {
  return API.getVans(params.vanID);
}

function createBackButtonText(chosenFilters: chosenFilterType): string {
  const urlAdditives: Array<string> = [];
  const keys = Object.keys(chosenFilters);
  keys.forEach((key) => {
    if (chosenFilters[key as keyof chosenFilterType]) {
      urlAdditives.push(key);
    }
  });
  const addlText = urlAdditives.map((key) => capitalize(key)).join(", ");
  return addlText.length > 0 ? `Back to ${addlText} vans` : "Back to all vans";
}

function createReturnUrlSearchParams(chosenFilters: chosenFilterType): string {
  const urlAdditives: Array<string> = [];
  Object.keys(chosenFilters).forEach((key) => {
    if (chosenFilters[key as keyof chosenFilterType]) {
      urlAdditives.push(`type=${key}`);
    }
  });
  return urlAdditives.length === 0 ? "" : "/?" + urlAdditives.join("&");
}

export default function VanPage(): JSX.Element {
  const data = useLoaderData() as Van;
  const { state } = useLocation();

  return (
    <main className="flex-1 overflow-x-hidden p-4 max-w-4xl mx-auto">
      <Link to={`..${createReturnUrlSearchParams(state)}`} relative="path">
        <span className="text-3xl">←</span>
        <span className="underline">{createBackButtonText(state)}</span>
      </Link>
      <div className="md:grid md:grid-cols-2 md:gap-4 mt-4">
        <img
          className="rounded my-4 md:my-0"
          src={data.imageUrl}
          alt={`${data.name} image`}
        />
        <div className="flex flex-col">
          <VanTypeNotif type={data.type} />
          <h1 className="text-2xl font-bold my-3">{data.name}</h1>
          <h2>
            <span className="font-bold text-xl">${data.price}</span>
            <span className="font-sm">/day</span>
          </h2>
          <p className="text-sm my-2">{data.description}</p>
          <button
            className={`w-full text-white h-12 font-bold rounded max-w-sm self-center mt-4 ${vanTypeColoring(
              data.type
            )}`}
          >
            Rent this van
          </button>
        </div>
      </div>
    </main>
  );
}

export { loader };
