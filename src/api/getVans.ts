import RouteError from "../types/RouteError";
export default async function getVans(id?: string) {
  const fetchString = `/api/vans${id ? `/${id}` : ""}`;
  const res = await fetch(fetchString);
  if (!res.ok) {
    throw {
      message: "Unable to Load Vans",
      status: res.status,
      statusText: res.statusText,
    } as RouteError;
  }
  const data = await res.json();
  return data;
}
