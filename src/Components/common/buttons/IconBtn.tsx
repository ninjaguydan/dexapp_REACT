import { HeartOutline, Heart, StarOutline, Star, ChatOutline, Trash } from "components/common/icons/index";
import { ICON_KEY } from "utils/iconKey";

type Props = {
  btnData: { label: string; content: string | number; action: () => void; state: boolean };
};
function IconBtn({ btnData: { label, content, action, state } }: Props) {
  let node = <></>;

  if (label === ICON_KEY.LIKES) {
    node = state ? <Heart className="text-secondary" /> : <HeartOutline />;
  }
  if (label === ICON_KEY.FAVORITE) {
    node = state ? <Star /> : <StarOutline />;
  }
  if (label === ICON_KEY.COMMENTS) {
    node = <ChatOutline />;
  }
  if (label === ICON_KEY.DELETE) {
    node = <Trash className="hover:text-primary" />;
  }

  return (
    <button
      aria-label={label}
      className={`p-1 text-gray3 flex gap-x-1 items-center text-xs hover:text-secondary ${
        label === ICON_KEY.DELETE ? "absolute top-4 right-4" : null
      }`}
      onClick={action}>
      {node}
      {content}
    </button>
  );
}
export default IconBtn;
