import hero from "../../assets/hero/BaseRootHero.png";
import { Link } from "react-router-dom";
export default function Root() {
  return (
    <main
      className="flex-1 py-8 px-4"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:container mx-auto flex flex-col justify-center items-center h-full">
        <p className="text-amber-50 text-3xl md:text-4xl lg:text-5xl font-bold">
          You got the travel plans, we got the travel vans.
        </p>
        <p className="text-amber-50 mt-8 md:text-xl lg:text-2xl max-w-4xl">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link
          to="/vans"
          className="bg-amber-600 text-white text-lg md:text-xl w-full max-w-lg rounded-sm h-12 font-bold flex self-stretch mx-auto items-center justify-center mt-8"
          role="navigation"
        >
          Find your van
        </Link>
      </div>
    </main>
  );
}
