import { createPortal } from "react-dom";

interface IMenuBtnProps {
  menuIsOpen: boolean;
  openMenu: () => void;
}

const MenuBtn = ({ menuIsOpen, openMenu }: IMenuBtnProps) => {
  return createPortal(
    <>
      <button
        id="menu-btn"
        className={`menu-btn ${menuIsOpen && "open"}`}
        onClick={openMenu}>
        <div className="menu-btn_burger"></div>
      </button>
    </>,
    document.body
  );
};

export default MenuBtn;
