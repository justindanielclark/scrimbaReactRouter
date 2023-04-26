import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import API from "../../api/API";
import StarsRating from "../../components/StarsRating";
import Review from "../../types/Review";
import User from "../../types/User";
import isDateWithinTimePeriod from "../../utils/isDateWithinTime";
import { requireAuth } from "../../utils/requireAuth";

async function loader() {
  //TODO: Currently Hardcoded Search For Host '123'
  requireAuth();
  return API.getHostReviews("123");
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
      <section className="px-2">
        <h2 className="text-xl font-bold">
          Scores
          <span className="text-sm align-top inline-block pl-2">
            {" "}
            {(
              reviews.reduce((acc, cur) => {
                return acc + cur.rating;
              }, 0) / reviews.length
            ).toFixed(1)}{" "}
            / 5 <span className="text-xs">avg.</span>
          </span>
        </h2>
        <table className="flex flex-col px-1 w-full max-w-xl">
          <tbody>
            {Array.from(reviewScores.keys())
              .sort((a, b) => b - a)
              .map((idx) => {
                return (
                  <tr
                    className="flex flex-row items-center gap-0 py-0"
                    key={idx}
                  >
                    <td className="w-16">{`${idx} Star${
                      idx !== 1 ? `s` : ""
                    }`}</td>
                    <td className="flex flex-row flex-1 bg-gray-400 rounded-lg h-3 items-center justify-start">
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
                    <td className="shrink-0 grow-0 w-10 text-right">
                      {`${getReviewPercentage(
                        reviewScores.get(idx),
                        reviews.length
                      )}%`}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
      <section className="px-2">
        <h2 className="text-xl font-bold">Reviews ({reviews.length}):</h2>
        <ul className="px-1">
          {reviews.map((review) => {
            return (
              <li
                key={review.id}
                className="py-2 border-b-gray-300 border-b-2 last:border-none"
              >
                <StarsRating rating={review.rating} />
                <div className="flex flex-row items-center">
                  <p className="font-bold mr-2 text-neutral-800">
                    {usersMap.get(review.userId)}
                  </p>
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

type reviewFilter =
  | "last30days"
  | "last3mon"
  | "last6mon"
  | "lastyear"
  | "alltime";

const reviewFilters: Array<{ value: reviewFilter; text: string }> = [
  { value: "last30days", text: "last 30 days" },
  { value: "last3mon", text: "last 3 months" },
  { value: "last6mon", text: "last 6 months" },
  { value: "lastyear", text: "last year" },
  { value: "alltime", text: "all time" },
];

function getFilteredReviews(arr: Array<Review>, filter: reviewFilter) {
  switch (filter) {
    case "last30days": {
      return arr.filter((review) =>
        isDateWithinTimePeriod(new Date(review.date), "days", 30)
      );
    }
    case "last3mon": {
      return arr.filter((review) =>
        isDateWithinTimePeriod(new Date(review.date), "months", 3)
      );
    }
    case "last6mon": {
      return arr.filter((review) =>
        isDateWithinTimePeriod(new Date(review.date), "months", 6)
      );
    }
    case "lastyear": {
      return arr.filter((review) =>
        isDateWithinTimePeriod(new Date(review.date), "years", 1)
      );
    }
    default: {
      return arr;
    }
  }
}

export default function Reviews() {
  const data = useLoaderData() as {
    reviews: Array<Review>;
    users: Array<User>;
  };
  const [filter, setFilter] = useState<reviewFilter>("alltime");
  const reviews = getFilteredReviews(data.reviews, filter);
  return (
    <>
      <section className="flex flew-row flex-wrap px-2 my-2 items-center justify-end w-full max-w-xl">
        <h1 className="text-2xl font-bold mr-4 flex-1 text-left whitespace-nowrap">
          Your Reviews
        </h1>
        <select
          defaultValue={filter}
          onChange={(e) => {
            setFilter(e.target.value as reviewFilter);
          }}
        >
          {reviewFilters.map((reviewFilter) => {
            return (
              <option value={reviewFilter.value} key={reviewFilter.value}>
                {reviewFilter.text}
              </option>
            );
          })}
        </select>
      </section>
      {reviews.length > 0 ? (
        <ReviewScores reviews={data.reviews} users={data.users} />
      ) : (
        <section className="px-2">
          <p className="px-1">
            Unable to locate any reviews under the selected time limit
          </p>
        </section>
      )}
    </>
  );
}

export { loader };
