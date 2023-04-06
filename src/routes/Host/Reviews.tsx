import { useLoaderData } from "react-router-dom";
import star from "../../assets/svgs/star.svg";
import StarsRating from "../../components/StarsRating";
import users from "../../server/data/users";
import Review from "../../types/Review";
import User from "../../types/User";

async function loader() {
  //TODO: Currently Hardcoded Search For Host '123'
  return fetch("/api/hosts/123/reviews").then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error("Unable To Retrieve API Data");
  });
}

export default function Reviews() {
  const data = useLoaderData() as {
    reviews: Array<Review>;
    users: Array<User>;
  };
  const usersMap = new Map<string, string>();
  users.forEach((user) => {
    usersMap.set(user.id, user.name);
  });
  return (
    <>
      <section className="flex flew-row flex-wrap">
        <h1 className="text-xl font-bold mr-4">Your Reviews</h1>
        <select>
          <option value="last30days">last 30 days</option>
          <option value="last3mon">last 3 months</option>
          <option value="last6mon">last 6 months</option>
          <option value="lastyear">last year</option>
          <option value="alltime">all time</option>
        </select>
      </section>
      <section>
        <h2>Reviews:</h2>
        <ul>
          {data.reviews.map((review) => {
            return (
              <li key={review.id}>
                <StarsRating rating={review.rating} />
                <div className="flex flex-row">
                  <p className="mr-2">{usersMap.get(review.userId)}</p>
                  <p className="text-sm text-neutral-700">
                    {new Date(review.date).toDateString().substring(4)}
                  </p>
                </div>
                <p>{review.review}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export { loader };
