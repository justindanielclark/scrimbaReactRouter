import Van from "../../types/Van";
import { Link } from "react-router-dom";
import VanTypeNotif from "../../components/VanTypeNotif";
import { chosenFilterType } from "./Vans";

type Props = {
  van: Van;
  chosenFilters: chosenFilterType;
};

export default function VanProductCard({ van, chosenFilters }: Props) {
  return (
    <Link to={van.id} state={chosenFilters}>
      <article className="bg-orange-100 rounded-lg overflow-hidden hover:bg-orange-200 flex flex-col">
        <img src={van.imageUrl} alt="host uplaoded image of van" />
        <div className="p-2 flex flex-col justify-between flex-1">
          <div className="flex flex-row">
            <h1 className="flex-1 font-bold text-lg">{van.name}</h1>
            <div className="flex flex-col">
              <p className="text-lg font-bold">${van.price}</p>
              <p className="text-sm text-end leading-3">/day</p>
            </div>
          </div>
          <VanTypeNotif type={van.type} />
        </div>
      </article>
    </Link>
  );
}
