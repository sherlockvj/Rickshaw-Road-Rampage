import React, { useEffect, useRef } from "react";
import initGame from "../kaboom/game";

const GameCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const destroy = initGame(canvasRef.current);
    return () => destroy && destroy();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", background: "#000" }}>
      <canvas
        ref={canvasRef}
        id="game"
        width={960}
        height={540}
        style={{
          border: "2px solid #00ffe7",
          backgroundColor: "#111",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default GameCanvas;
