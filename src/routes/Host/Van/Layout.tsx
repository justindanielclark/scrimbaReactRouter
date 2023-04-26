import Van from "../../../types/Van";
import { NavLink } from "react-router-dom";
import { useLoaderData, LoaderFunctionArgs, Outlet } from "react-router-dom";
import VanTypeNotif from "../../../components/VanTypeNotif";

async function loader({ params }: LoaderFunctionArgs) {
  //TODO: Currently Hardcoded Search For Host '123'
  return fetch(`/api/vans/${params.vanId}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error("Unable To Retrieve API Data");
  });
}

export default function VanLayout() {
  const data = useLoaderData() as Van;
  return (
    <>
      <NavLink to={"/host/vans"} className="my-2" relative="path">
        <span className="text-xl inline-block mr-2">←</span>
        <span className="underline underline-offset-2">Back to all vans</span>
      </NavLink>
      <div className="px-3 my-2">
        <section className="flex flex-row gap-4">
          <img
            className="w-36 h-36"
            src={data.imageUrl}
            alt="Thumbnail of van to show user"
          />
          <div className="h-full flex flex-col gap-2 items-start">
            <VanTypeNotif type={data.type} />
            <h1 className="text-2xl font-bold">{data.name}</h1>
          </div>
        </section>
        <nav className="flex flex-row my-4 bg-neutral-100">
          <NavLink
            end
            to={"."}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
            }
          >
            Details
          </NavLink>
          <NavLink
            to={"./pricing"}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to={"./photos"}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
            }
          >
            Photos
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export { loader };
