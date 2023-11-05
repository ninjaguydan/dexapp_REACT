import { createPortal } from "react-dom";

interface Props {
  data: { action: () => void; isOpen: boolean; isVisible: boolean };
}

const MenuBtn = ({ data: { action, isOpen, isVisible } }: Props) => {
  if (!isVisible) return <></>;
  return createPortal(
    <>
      <button
        id="menu-btn"
        className={`menu-btn ${isOpen ? "open" : ""}`}
        onClick={action}>
        <div className="menu-btn_burger"></div>
      </button>
    </>,
    document.body
  );
};

export default MenuBtn;
