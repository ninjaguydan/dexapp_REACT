import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner
        name="circle"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default Loading;
