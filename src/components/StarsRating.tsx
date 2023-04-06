import star from "../assets/svgs/star.svg";
import halfstar from "../assets/svgs/halfstar.svg";

type Props = {
  rating: number;
};

function StarsRating({ rating }: Props) {
  let numStars = Math.floor(rating);
  let HalfStars = 0;
  const modRating = rating % 1;
  if (modRating > 0.75) {
    numStars++;
  } else if (modRating > 0.35) {
    HalfStars++;
  }
  const starImages = [];
  for (let i = 0; i < numStars; i++) {
    starImages.push(<img className="w-4 h-4" src={star} key={i} />);
  }
  if (HalfStars) {
    starImages.push(
      <img className="w-4 h-4" src={halfstar} key={"halfStar"} />
    );
  }

  return <div className="flex flex-row justify-start">{starImages}</div>;
}

export default StarsRating;
