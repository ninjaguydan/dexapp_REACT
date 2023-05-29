import getImageByKey from "../../Helpers/getImageByKey";

interface IProfileIconProps {
  selected: boolean;
  click: (e: any) => void;
  id: string;
}

const ProfileIcon = ({ click, id, selected }: IProfileIconProps) => {
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

export default ProfileIcon;
