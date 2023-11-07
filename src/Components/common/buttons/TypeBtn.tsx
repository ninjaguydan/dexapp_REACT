import { styleType } from "utils/styleType";

interface Props {
  type: string;
  classList?: string;
}

function TypeBtn({ type, classList }: Props) {
  return (
    <button
      style={styleType(type)}
      className={`border border-solid border-white border-opacity-10 rounded-full p-1 capitalize w-full text-xs font-bold max-w-[156px] ${classList}`}>
      {type}
    </button>
  );
}
export default TypeBtn;
