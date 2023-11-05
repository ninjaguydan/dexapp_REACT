import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <div className="my-12 mx-auto">
      <Spinner
        name="ball-scale-multiple"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default Loading;
