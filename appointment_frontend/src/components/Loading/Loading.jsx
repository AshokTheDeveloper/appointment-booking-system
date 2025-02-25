import BeatLoader from "react-spinners/BeatLoader";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading d-flex justify-content-center align-items-center">
      <BeatLoader
        size={22}
        color={"#184eff"}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
