export default function Vans() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <h2 className="font-bold text-xl">Explore our van options</h2>
      <div className="flex flex-row w-full justify-between px-3">
        <button className="py-2 px-4 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          Simple
        </button>
        <button className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          Luxury
        </button>
        <button className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          Rugged
        </button>
        <button className="">Clear Filters</button>
      </div>
    </main>
  );
}
