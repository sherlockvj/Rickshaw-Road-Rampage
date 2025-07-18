import React, { useEffect, useRef } from "react";
import initGame from "../kaboom/game";

const Canvas = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const destroyGame = initGame(canvasRef.current);

		return () => {
			destroyGame();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				display: "block",
			}}
		/>
	);
};

export default Canvas;
