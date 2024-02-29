import { useEffect } from "react";

function Timer({ dispatch, totalSeconds, hasAnswered }) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  useEffect(
    function () {
      if (!hasAnswered) {
        const id = setInterval(function () {
          dispatch({ type: "countDown" });
        }, 1000);

        return () => clearInterval(id);
      }
    },
    [dispatch, hasAnswered]
  );

  return (
    <div className={hasAnswered ? "timer finished-timer" : "timer"}>
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
