import Van from "../../types/Van";
import { NavLink, useLoaderData } from "react-router-dom";

type LoadedData = {
  vans: Array<Van>;
  income: number;
  reviewScore: number;
};

async function loader() {
  return null;
}
export default function Details() {
  // const data: LoadedData = useLoaderData();
  const data = {
    income: 2000,
    reviewScore: 4.5,
    vans: [
      {
        id: "3",
        name: "Reliable Red",
        price: 100,
        description:
          "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
        imageUrl:
          "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
        type: "luxury",
      },
      {
        id: "6",
        name: "Green Wonder",
        price: 70,
        description:
          "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
        imageUrl:
          "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
        type: "rugged",
      },
    ],
  };
  const income = parseFloat(data.income.toFixed(2)).toLocaleString("en-IN", {
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
      <section className="flex flex-row bg-orange-100 p-4 flex-wrap gap-1 justify-end">
        <p className="flex-1">
          <span className="inline-block text-xl font-bold mr-2 whitespace-nowrap">
            Review Score:
          </span>
          <span className="font-bold whitespace-nowrap">
            🌟 {data.reviewScore}
          </span>
          /5.0
        </p>
        <NavLink
          to="/host/reviews"
          className="py-1 px-2 bg-teal-800 text-white font-bold rounded h-fit basis-auto text-sm"
        >
          Details
        </NavLink>
      </section>
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
            return (
              <li className="flex flex-row p-3 gap-4 bg-neutral-50 rounded items-center mx-auto w-full max-w-lg">
                <img
                  className="w-16 h-16 rounded-lg"
                  src={van.imageUrl}
                  alt={`Thumbnail`}
                />
                <div className="flex-1">
                  <h1 className="font-bold">{van.name}</h1>
                  <p className="text-sm pl-1">${van.price}/day</p>
                </div>
                <NavLink
                  className="py-1 px-2 bg-yellow-600 text-white font-bold text-sm rounded"
                  to={`/host/vans/${van.id}/edit`}
                >
                  Edit
                </NavLink>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
