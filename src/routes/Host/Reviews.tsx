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

function getReviewPercentage(
  reviews: number | undefined,
  totalReviews: number
): string {
  if (reviews !== undefined) {
    return ((reviews / totalReviews) * 100).toFixed(0);
  }
  return "0";
}

function ReviewScores({
  users,
  reviews,
}: {
  users: Array<User>;
  reviews: Array<Review>;
}): JSX.Element {
  const usersMap = new Map<string, string>();
  const reviewScores = new Map<number, number>();
  for (let i = 1; i <= 5; i++) {
    reviewScores.set(i, 0);
  }
  users.forEach((user) => {
    usersMap.set(user.id, user.name);
  });
  reviews.forEach((review) => {
    const score = reviewScores.get(review.rating);
    if (score !== undefined) {
      reviewScores.set(review.rating, score + 1);
    }
  });

  return (
    <>
      <section>
        <h2 className="text-xl font-bold">Scores:</h2>
        <table className="flex flex-col">
          {[5, 4, 3, 2, 1].map((idx) => {
            return (
              <tr className="flex flex-row items-center">
                <td className="basis-auto">{idx} Stars</td>
                <td className="flex flex-row flex-1 bg-gray-400 rounded-lg h-4 items-center justify-start p-0.5">
                  <div
                    className="bg-orange-500 rounded-lg h-full"
                    style={{
                      width: `${getReviewPercentage(
                        reviewScores.get(idx),
                        reviews.length
                      )}%`,
                    }}
                  ></div>
                </td>
                <td className="basis-auto">
                  {`${getReviewPercentage(
                    reviewScores.get(idx),
                    reviews.length
                  )}%`}
                </td>
              </tr>
            );
          })}
        </table>
      </section>
      <section>
        <h2 className="text-xl font-bold">Reviews:</h2>
        <ul>
          {reviews.map((review) => {
            return (
              <li
                key={review.id}
                className="py-2 border-b-gray-300 border-b-2 last:border-none"
              >
                <StarsRating rating={review.rating} />
                <div className="flex flex-row items-center">
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

export default function Reviews() {
  const data = useLoaderData() as {
    reviews: Array<Review>;
    users: Array<User>;
  };
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
      {data.reviews.length > 0 ? (
        <ReviewScores reviews={data.reviews} users={data.users} />
      ) : (
        <section>
          <p>It doesn't look like there are any reviews... yet.</p>
        </section>
      )}
    </>
  );
}

export { loader };
