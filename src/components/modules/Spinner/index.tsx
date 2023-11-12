import "./spinner.css";

type Props = {
  color?: string;
};

export default function Spinner({ color = "#323442" }: Props) {
  const loaderColor = {
    backgroundColor: color,
  };

  return (
    <div className="spinner">
      <div
        className="bar1"
        style={loaderColor}></div>
      <div
        className="bar2"
        style={loaderColor}></div>
      <div
        className="bar3"
        style={loaderColor}></div>
      <div
        className="bar4"
        style={loaderColor}></div>
      <div
        className="bar5"
        style={loaderColor}></div>
      <div
        className="bar6"
        style={loaderColor}></div>
      <div
        className="bar7"
        style={loaderColor}></div>
      <div
        className="bar8"
        style={loaderColor}></div>
      <div
        className="bar9"
        style={loaderColor}></div>
      <div
        className="bar10"
        style={loaderColor}></div>
      <div
        className="bar11"
        style={loaderColor}></div>
      <div
        className="bar12"
        style={loaderColor}></div>
    </div>
  );
}
