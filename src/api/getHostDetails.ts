import RouteError from "../types/RouteError";
export default async function getHostDetails(hostId: string) {
  const fetchString = `/api/hosts/${hostId}/details`;
  return fetch(fetchString).then((res) => {
    if (!res.ok) {
      throw {
        message: "Unable to Load Host Details",
        status: res.status,
        statusText: res.statusText,
      } as RouteError;
    }
    return res.json();
  });
}
