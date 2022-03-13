import Star from "../Star/Star";

const Rating = ({ rating }) => {
  const ratingFull = Math.floor(rating);
  const ratingHalf = Math.floor((rating - ratingFull) / 0.5);

  return (
    <div>
      {Array(ratingFull).fill(<Star />)}
      {Array(ratingHalf).fill(<Star half />)}
    </div>
  );
};

export default Rating;
