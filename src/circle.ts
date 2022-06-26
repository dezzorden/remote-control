import robot from 'robotjs';
import { Commands } from './commands';

export const drawCircle = async ([radius, ...rest]: number[]) => {
	robot.setMouseDelay(1);

	const { x, y } = robot.getMousePos();
	robot.moveMouse(x + radius, y);

	robot.mouseToggle('down');

	for (let degree = 0; degree <= 360; degree += 1.5) {
		const dx = Math.cos(degree * Math.PI / 180) * radius;
		const dy = Math.sin(degree * Math.PI / 180) * radius;
		robot.moveMouse(x + dx, y - dy);
	}

	robot.mouseToggle('up');

	return Commands.DRAW_CIRCLE;
}
