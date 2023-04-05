import { Link } from "react-router-dom";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import Van from "../../types/Van";
import capitalize from "../../utils/capitalize";
import VanTypeNotif from "../../components/VanTypeNotif";
import vanTypeColoring from "../../utils/vanTypeColoring";

type loaderArgs = {
  params: {
    vanID: number;
  };
};

async function loader({ params }: LoaderFunctionArgs) {
  return fetch(`/api/vans/${params.vanID}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Unable to Retrieve Van Data");
      }
      return res.json();
    })
    .then((data) => {
      const modData = { ...data.vans };
      return Promise.resolve(modData);
    });
}

export default function VanPage(): JSX.Element {
  const data = useLoaderData() as Van;
  return (
    <main className="flex-1 overflow-x-hidden p-4 max-w-4xl mx-auto">
      <Link to="/vans">
        <span className="text-3xl">←</span>
        <span className="underline">Back to all vans</span>
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
