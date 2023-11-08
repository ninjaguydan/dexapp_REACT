import { createContext, useContext } from "react";

type Props = {
  action: () => void;
  children: React.ReactNode;
};

const ButtonContext = createContext({
  action: () => {},
});

export default function Button({ children, action }: Props) {
  return <ButtonContext.Provider value={{ action }}>{children}</ButtonContext.Provider>;
}

Button.Primary = function ButtonPrimary(props: any) {
  const { action } = useContext(ButtonContext);

  return (
    <button
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 bg-primary hover:bg-primaryDark"
      onClick={() => action()}>
      {props.children}
    </button>
  );
};

Button.Secondary = function ButtonSecondary(props: any) {
  const { action } = useContext(ButtonContext);

  return (
    <button
      className="w-full py-1 px-8 rounded text-white disabled:opacity-50 border border-solid border-white hover:bg-[#383838]"
      onClick={() => action()}>
      {props.children}
    </button>
  );
};
