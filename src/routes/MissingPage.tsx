import { Link } from "react-router-dom";
function MissingPage() {
  return (
    <main className="w-full max-w-md mx-auto flex-1 gap-4 flex-col flex pt-10 p-3">
      <h1 className="text-3xl font-bold">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link
        to={"/"}
        className="bg-black text-xl text-white p-3 w-full text-center rounded-lg"
      >
        Return to Home
      </Link>
    </main>
  );
}

export default MissingPage;
