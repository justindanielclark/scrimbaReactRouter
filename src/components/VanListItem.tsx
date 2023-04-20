import { NavLink } from "react-router-dom";
import Van from "../types/Van";
type Props = {
  van: Van;
};
export default function VanListItem({ van }: Props) {
  return (
    <li className="flex flex-row flex-wrap p-3 gap-4 bg-neutral-50 rounded items-center mx-auto w-full max-w-lg">
      <img
        className="w-16 h-16 rounded-lg"
        src={van.imageUrl}
        alt={`Thumbnail`}
      />
      <div className="flex-1 flex flex-row flex-wrap">
        <div className="flex-1 w-32">
          <h1 className="font-bold">{van.name}</h1>
          <p className="text-sm pl-1">${van.price}/day</p>
        </div>
        <div className="flex flex-col shrink justify-between gap-2">
          <NavLink
            className="py-1 px-2 bg-teal-800 text-white font-bold text-sm rounded text-center"
            to={`/host/vans/${van.id}`}
          >
            View
          </NavLink>
          <NavLink
            className="py-1 px-2 bg-yellow-600 text-white font-bold text-sm rounded text-center"
            to={`/host/vans/${van.id}/edit`}
          >
            Edit
          </NavLink>
        </div>
      </div>
    </li>
  );
}
