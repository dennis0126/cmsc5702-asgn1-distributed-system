import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const Star = ({ half }) => {
  if (half) {
    return <FontAwesomeIcon icon={faStarHalf} style={{ color: "#ffe426", height: "14px" }} />;
  }
  return <FontAwesomeIcon icon={faStar} style={{ color: "#ffe426", height: "14px" }} />;
};

export default Star;
