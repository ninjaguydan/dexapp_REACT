type Props = {
  text: string;
  action?: () => void;
  isDisabled?: boolean;
  isSecondary?: boolean;
  classList?: string;
};

export default function Btn({ text, action, isDisabled = false, isSecondary = false, classList }: Props) {
  return (
    <button
      className={`w-full py-1 px-8 rounded text-white disabled:opacity-50 ${
        isSecondary ? "border border-solid border-white hover:bg-gray2" : "bg-primary hover:bg-primaryDark "
      } ${classList}`}
      disabled={isDisabled}
      onClick={action}>
      {text}
    </button>
  );
}
