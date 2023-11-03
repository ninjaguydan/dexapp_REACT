interface ISelectColorProps {
  selected: boolean;
  click: (e: any) => void;
  color: string;
}

const SelectColor = ({ selected, click, color }: ISelectColorProps) => {
  return (
    <button
      type="button"
      className={`w-full rounded-lg after:content-[''] after:block after:pb-[100%] ${color} ${
        selected ? "ring-2 ring-white" : ""
      }`}
      onClick={(event) => click(event)}
      name="bg_color"
      id={color}></button>
  );
};

export default SelectColor;
