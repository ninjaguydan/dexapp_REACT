type Props = {
  children: React.ReactNode;
  classList?: string;
};

export default function ListItem({ children, classList }: Props) {
  return (
    <li
      className={`${classList} border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between`}>
      {children}
    </li>
  );
}
