import 'dotenv/config';
import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import { drawCircle } from './circle';
import { Commands } from './commands';
import { getMousePos, moveDown, moveLeft, moveRight, moveUp } from './mouse';
import { drawRectangle, drawSquare } from './square';

const PORT =  8080;

const commands = {
	[Commands.MOUSE_POSITION]: getMousePos,
	[Commands.LEFT]: moveLeft,
	[Commands.RIGHT]: moveRight,
	[Commands.UP]: moveUp,
	[Commands.DOWN]: moveDown,
	[Commands.DRAW_CIRCLE]: drawCircle,
	[Commands.DRAW_SQUARE]: drawSquare,
	[Commands.DRAW_RECTANGLE]: drawRectangle,
}

const wss = new WebSocketServer({
	port: PORT,
});

console.log(`Web Socket Server started on port ${wss.options.port}`);

wss.on('connection', (ws, req) => {
	console.log('New connection from address:', req.socket.remoteAddress, 'port:', req.socket.remotePort);

	const webSocketStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

	webSocketStream.on('data', async (message) => {
		console.log('received:', message);

		const [command, ...rest] = message.split(' ');
		const args = rest.map(Number);

		if (command in commands) {
			try {
				const result = await commands[command](args);
				console.log('success:', result);
				webSocketStream.write(result + '\0');
			} catch (err: any) {
				console.error('failed:', command, ', got error:', err.message);
			}
		}
	});

	ws.on('close', () => {
		console.log('Connection closed');
	});
});

wss.on('close', () => {
	console.log('Server shutdown');
});

process.on('SIGINT', () => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.close();
		}
	});

	wss.close();
});
