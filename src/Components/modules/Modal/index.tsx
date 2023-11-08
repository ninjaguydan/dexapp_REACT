import { createContext, useContext, useEffect, useRef, createRef } from "react";
import { createPortal } from "react-dom";

import Button from "components/modules/Button";

import handleTabKey from "./utils/handleTabKey";

type Props = {
  closeModal: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
};

const ModalContext = createContext({
  closeModal: () => {},
  onConfirm: () => {},
});

function clickedOutside(event: PointerEvent, element: React.MutableRefObject<Element | undefined>) {
  if (event.pointerType === "") return;

  const elementDimensions = element.current!.getBoundingClientRect();
  if (
    event.clientX < elementDimensions.left ||
    event.clientX > elementDimensions.right ||
    event.clientY < elementDimensions.top ||
    event.clientY > elementDimensions.bottom
  ) {
    return true;
  } else {
    return false;
  }
}

export default function Modal({ children, closeModal, onConfirm = () => {} }: Props) {
  const modalRef: React.MutableRefObject<Element | undefined> = useRef();
  const keyListenersMap: Map<number, (e: KeyboardEvent, modalRef: React.MutableRefObject<Element | undefined>) => void> =
    new Map([
      [27, closeModal],
      [9, handleTabKey],
    ]);

  // register a "keydown" listener for mapped key codes. Runs function of corresponding key if it exists
  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e, modalRef);
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  useEffect(() => {
    function modalHandler(e: any) {
      if (clickedOutside(e, modalRef)) {
        closeModal();
      }
    }
    document.addEventListener("click", modalHandler, true);
    return () => document.removeEventListener("click", modalHandler, true);
  });

  return createPortal(
    <div
      className="flex block p-4 bg-black_80 fixed z-20 top-0 left-0 w-full h-full overflow-auto backdrop-blur-sm"
      aria-modal="true">
      <figure
        className="bg-gray2 max-w-lg m-auto p-4 sm:p-6 rounded flex flex-col gap-y-2"
        ref={modalRef as any}>
        <ModalContext.Provider value={{ closeModal, onConfirm }}>{children}</ModalContext.Provider>
      </figure>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader(props: any) {
  const { closeModal } = useContext(ModalContext);

  return (
    <>
      <header className="flex justify-between items-center pb-1">
        <h2 className="text-xl font-medium">{props.children}</h2>
        <button
          onClick={() => closeModal()}
          className="text-gray5 text-2xl px-2 rounded hover:bg-[#383838]"
          autoFocus>
          &#10005;
        </button>
      </header>
      <hr />
    </>
  );
};

Modal.Body = function ModalBody(props: any) {
  return <main>{props.children}</main>;
};

Modal.Footer = function ModalFooter(props: any) {
  const { closeModal, onConfirm } = useContext(ModalContext);
  return (
    <footer className="flex items-center gap-x-4">
      <Button
        action={() => {
          closeModal();
        }}>
        <Button.Secondary>Cancel</Button.Secondary>
      </Button>
      <Button
        action={() => {
          onConfirm();
          closeModal();
        }}>
        <Button.Primary>{props.children}</Button.Primary>
      </Button>
    </footer>
  );
};
