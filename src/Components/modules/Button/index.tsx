import { createContext, useContext, forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
  action: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  ref?: React.MutableRefObject<HTMLButtonElement>;
};

const ButtonContext = createContext({
  action: () => {},
  isDisabled: false,
  ref: {} as React.MutableRefObject<HTMLButtonElement> | undefined,
});

export default function Button({ children, action, isDisabled = false, ref }: Props) {
  return <ButtonContext.Provider value={{ action, isDisabled, ref }}>{children}</ButtonContext.Provider>;
}

Button.Primary = forwardRef(function ButtonPrimary(props: any, ref?) {
  const { action, isDisabled } = useContext(ButtonContext);
  // const btnRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef();

  return (
    <button
      // ref={btnRef as any}
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 bg-primary hover:bg-primaryDark"
      onClick={() => action()}
      disabled={isDisabled}>
      {props.children}
    </button>
  );
});

Button.Secondary = forwardRef(function ButtonSecondary(props: any, ref?) {
  const { action, isDisabled } = useContext(ButtonContext);
  const btnRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef();

  useImperativeHandle(
    ref, //forwarded ref
    function () {
      return {
        focus() {
          btnRef.current!.focus();
        },
      }; // forwarded ref value
    },
    []
  );

  return (
    <button
      ref={btnRef as any}
      type="button"
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 border border-solid border-white hover:bg-[#3d3c44]"
      onClick={() => action()}
      disabled={isDisabled}>
      {props.children}
    </button>
  );
});
