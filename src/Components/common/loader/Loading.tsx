import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <div className="my-12 mx-auto">
      <Spinner
        name="circle"
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default Loading;
