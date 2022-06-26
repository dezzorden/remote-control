import robot from 'robotjs';
import { Commands } from './commands';

export const getMousePos = async () => {
	const mouse = robot.getMousePos();
	return `${Commands.MOUSE_POSITION} ${mouse.x},${mouse.y}`;
}

const mouseMove = async (dx: number, dy: number) => {
	const { x, y } = robot.getMousePos();
	robot.moveMouse(x + dx, y + dy);
}

export const moveLeft = async ([dx, ...rest]: number[]) => {
	await mouseMove(-dx, 0);
	return Commands.LEFT;
}

export const moveRight = async ([dx, ...rest]: number[]) => {
	await mouseMove(dx, 0);
	return Commands.RIGHT;
}

export const moveUp = async ([dy, ...rest]: number[]) => {
	await mouseMove(0, -dy);
	return Commands.UP;
}

export const moveDown = async ([dy, ...rest]: number[]) => {
	await mouseMove(0, dy);
	return Commands.DOWN;
}
