import RouteError from "../types/RouteError";
export default async function getHostDetails(hostId: string) {
  const fetchString = `/api/hosts/${hostId}/details`;
  const res = await fetch(fetchString);
  if (!res.ok) {
    throw {
      message: "Unable to Load Host Details",
      status: res.status,
      statusText: res.statusText,
    } as RouteError;
  }
  return await res.json();
}
