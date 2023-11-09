import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import setImage from "utils/setDefaultImg";

type Props = {
  pkmnId: number;
  direction: "prev" | "next";
};

function scrollToTop() {
  window.scrollTo(0, 0);
}
function grabImage(num: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
}

export default function PokeNavBtn({ pkmnId, direction }: Props) {
  let Arrow;

  if (direction === "next") {
    Arrow = <FaArrowRight />;
  } else {
    Arrow = <FaArrowLeft />;
  }

  return (
    <Link
      to={`/pokemon/${pkmnId}`}
      className={`flex items-center justify-center gap-x-4 ${direction === "next" ? "flex-row-reverse" : "flex-row"}`}
      onClick={scrollToTop}>
      {Arrow}
      <img
        src={grabImage(pkmnId)}
        onError={(e) => {
          setImage(e);
        }}
        className="w-16 h-16 rounded-full bg-gray1 hover:ring-2 hover:ring-gray3"
      />
    </Link>
  );
}
