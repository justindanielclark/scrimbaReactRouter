import RouteError from "../types/RouteError";
export default async function getVans(id?: string) {
  const fetchString = `/api/vans${id ? `/${id}` : ""}`;
  return fetch(fetchString)
    .then((res) => {
      if (!res.ok) {
        throw {
          message: "Unable to Load Vans",
          status: res.status,
          statusText: res.statusText,
        } as RouteError;
      }
      return res;
    })
    .then((res) => res.json());
}
