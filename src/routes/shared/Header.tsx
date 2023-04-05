import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-neutral-100 text-stone-900 h-24 basis-auto shrink-0 grow-0">
      <div className="max-w-5xl mx-auto flex flex-col xs:flex-row justify-between xs:items-center px-4 h-full">
        <h1 className="text-3xl mt-4 xs:mt-0 font-bold basis-1/2">
          <Link to="/">#VANLIFE</Link>
        </h1>
        <nav className="flex flex-row text-md gap-6 xs:basis-1/2 h-12 items-center justify-end">
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 font-bold" : ""
            }
            to="/host"
          >
            Host
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 font-bold" : ""
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 font-bold" : ""
            }
            to="/vans"
          >
            Vans
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
