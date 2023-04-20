import RouteError from "../types/RouteError";
export default async function getHostReviews(hostId: string) {
  const fetchString = `/api/hosts/${hostId}/reviews`;
  return fetch(fetchString).then((res) => {
    if (!res.ok) {
      throw {
        message: "Unable to Load Host Reviews",
        status: res.status,
        statusText: res.statusText,
      } as RouteError;
    }
    return res.json();
  });
}
