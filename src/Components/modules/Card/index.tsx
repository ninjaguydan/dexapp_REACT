type Props = {
  children: React.ReactNode;
  classList?: string;
};
export default function Card({ children, classList }: Props) {
  return (
    <article
      className={`relative flex gap-x-2 sm:gap-x-4 bg-gray2 p-3 sm:p-4 rounded border border-white border-solid border-opacity-10 flex-wrap ${classList}`}>
      {children}
    </article>
  );
}
