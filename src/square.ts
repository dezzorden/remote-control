import robot from 'robotjs';
import { Commands } from './commands';

export const drawRectangle = async ([sizeX, sizeY, ...rest]: number[]) => {
	robot.setMouseDelay(1);

	let { x, y } = robot.getMousePos();

	robot.mouseToggle('down');

	robot.moveMouse(x - sizeX, y);
	robot.moveMouse(x - sizeX, y - sizeY);
	robot.moveMouse(x, y - sizeY);
	robot.moveMouse(x, y);

	robot.mouseToggle('up');

	return Commands.DRAW_RECTANGLE;
}

export const drawSquare = async ([size, ...rest]: number[]) => {
	await drawRectangle([size, size]);
	return Commands.DRAW_SQUARE;
}
