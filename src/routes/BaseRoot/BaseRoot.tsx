import hero from "../../assets/hero/BaseRootHero.png";
import { Link } from "react-router-dom";
export default function BaseRoot() {
  return (
    <main
      className="flex-1 flex flex-col justify-around items-center py-8 px-4"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="text-amber-50 w-full text-3xl font-bold">
        You got the travel plans, we got the travel vans.
      </p>
      <p className="text-amber-50">
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </p>
      <Link
        to="/vans"
        className="bg-amber-600 text-white w-full rounded-sm h-12 font-bold flex items-center justify-center"
      >
        <button role="navigation">Find your van</button>
      </Link>
    </main>
  );
}
