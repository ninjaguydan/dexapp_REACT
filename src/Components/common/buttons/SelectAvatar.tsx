import getImageByKey from "utils/getImageByKey";

interface ISelectAvatarProps {
  selected: boolean;
  click: (e: any) => void;
  id: string;
}

const SelectAvatar = ({ click, id, selected }: ISelectAvatarProps) => {
  return (
    <button
      onClick={(event) => click(event)}
      type="button"
      className={`${selected && "selected"}`}>
      <img
        src={getImageByKey(`${id}`)}
        id={id}
        //@ts-ignore
        name="user_img"
      />
    </button>
  );
};

export default SelectAvatar;
