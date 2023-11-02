interface ISelectColorProps {
  selected: boolean;
  click: (e: any) => void;
  color: string;
}

const SelectColor = ({ selected, click, color }: ISelectColorProps) => {
  return (
    <button
      type="button"
      className={`${color} ${selected && "selected"}`}
      onClick={(event) => click(event)}
      name="bg_color"
      id={color}></button>
  );
};

export default SelectColor;
