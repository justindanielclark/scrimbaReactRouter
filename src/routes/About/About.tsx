import hero from "../../assets/hero/AboutHero.png";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col justify-between items-center">
        <img src={hero} alt="hero_image" />
        <div className="py-8 px-4 flex-1 flex flex-col gap-4">
          <section>
            <p className="text-neutral-800 w-full text-2xl font-bold">
              Don't squeeze in a sedan when you could relax in a van.
            </p>
            <p className="text-neutral-800 mt-4">
              Our mission is to enliven your road trip with the perfect travel
              van rental. Our vans are recertified before each trip to ensure
              your travel plans can go off without a hitch. (Hitch costs extra
              😉)
            </p>
            <p className="text-neutral-800 mt-4">
              Our team is full of vanlife enthusiasts who know firsthand the
              magic of touring the world on 4 wheels.
            </p>
          </section>
          <section className="bg-orange-200 w-full rounded p-6 mt-6 max-w-md mx-auto">
            <p className="font-bold text-lg">Your destination is waiting.</p>
            <p className="font-bold text-lg my-4">Your van is ready.</p>
            <Link
              to="/vans"
              className="bg-black text-white p-3 rounded-lg font-bold inline-block"
            >
              Explore our vans
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
