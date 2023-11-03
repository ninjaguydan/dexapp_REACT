import React from "react";

interface Props {
  children: React.ReactNode;
  classList?: string;
}
function Card({ children, classList }: Props) {
  return (
    <article
      className={`relative flex gap-x-4 bg-gray2 p-4 rounded border border-white border-solid border-opacity-10 flex-wrap ${classList}`}>
      {children}
    </article>
  );
}
export default Card;
