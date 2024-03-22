function RestartButton({ dispatch }) {
  function handleRestart() {
    const confirmRestart = window.confirm("Are you sure you want to restart?");

    if (confirmRestart) {
      dispatch({ type: "restart" });
    }
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        handleRestart();
      }}
    >
      ↺ Restart
    </button>
  );
}

export default RestartButton;
