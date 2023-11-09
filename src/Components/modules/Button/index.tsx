import { createContext, useContext } from "react";

type Props = {
  action: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
};

const ButtonContext = createContext({
  action: () => {},
  isDisabled: false,
});

export default function Button({ children, action, isDisabled = false }: Props) {
  return <ButtonContext.Provider value={{ action, isDisabled }}>{children}</ButtonContext.Provider>;
}

Button.Primary = function ButtonPrimary(props: any) {
  const { action, isDisabled } = useContext(ButtonContext);

  return (
    <button
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 bg-primary hover:bg-primaryDark"
      onClick={() => action()}
      disabled={isDisabled}>
      {props.children}
    </button>
  );
};

Button.Secondary = function ButtonSecondary(props: any) {
  const { action, isDisabled } = useContext(ButtonContext);

  return (
    <button
      type="button"
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 border border-solid border-white hover:bg-[#3d3c44]"
      onClick={() => action()}
      disabled={isDisabled}>
      {props.children}
    </button>
  );
};
