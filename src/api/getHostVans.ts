import RouteError from "../types/RouteError";
export default async function getHostVans(hostId: string) {
  const fetchString = `/api/hosts/${hostId}/vans`;
  const res = await fetch(fetchString);
  if (!res.ok) {
    throw {
      message: "Unable to Load Host Vans",
      status: res.status,
      statusText: res.statusText,
    } as RouteError;
  }
  return await res.json();
}
