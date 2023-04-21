import RouteError from "../types/RouteError";
export default async function getHostReviews(hostId: string) {
  const fetchString = `/api/hosts/${hostId}/reviews`;
  const res = await fetch(fetchString);
  if (!res.ok) {
    throw {
      message: "Unable to Load Host Reviews",
      status: res.status,
      statusText: res.statusText,
    } as RouteError;
  }
  return await res.json();
}
