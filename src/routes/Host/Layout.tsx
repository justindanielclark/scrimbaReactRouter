import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto overflow-x-hidden flex-1">
      <nav className="flex flex-row justify-start shrink-0 items-center bg-orange-100 gap-4 overflow-x-auto">
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
          }
          end
          to={"."}
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
          }
          to={"income"}
        >
          Income
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
          }
          to={"vans"}
        >
          Vans
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4 p-3 font-bold" : "p-3"
          }
          to={"reviews"}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </main>
  );
}
