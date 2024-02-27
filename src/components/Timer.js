import { useEffect } from "react";

function Timer({ dispatch, secsRemaining }) {
  const minutes = Math.floor(secsRemaining / 60);
  const seconds = secsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "countDown" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
