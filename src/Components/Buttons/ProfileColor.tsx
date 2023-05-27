interface IProfileColorProps {
  selected: boolean;
  click: (e: any) => void;
  color: string;
}

const ProfileColor = ({ selected, click, color }: IProfileColorProps) => {
  return (
    <button
      type="button"
      className={`${color} ${selected && "selected"}`}
      onClick={(event) => click(event)}
      name="bg_color"
      id={color}></button>
  );
};

export default ProfileColor;
