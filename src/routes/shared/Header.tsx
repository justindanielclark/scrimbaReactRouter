import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="flex flex-row justify-between h-28 bg-neutral-100 text-stone-900 items-center px-4">
      <h1 className="text-xl font-bold basis-1/2">
        <Link to="/">#VANLIFE</Link>
      </h1>
      <ul className="flex flex-row text-md gap-6 basis-1/2 justify-end">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/about"
        >
          <li>About</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/vans"
        >
          <li>Vans</li>
        </NavLink>
      </ul>
    </header>
  );
}
