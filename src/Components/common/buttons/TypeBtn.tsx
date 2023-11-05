import { styleType } from "utils/styleType";

interface Props {
  type: string;
}

function TypeBtn({ type }: Props) {
  return (
    <button
      style={styleType(type)}
      className="border border-solid border-white border-opacity-10 rounded-full p-2 capitalize w-full">
      {type}
    </button>
  );
}
export default TypeBtn;
