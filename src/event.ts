import { EventEmitter } from "stream";

const event = new EventEmitter();
event.on('e1', console.log);
event.on('e2', () => { throw new Error('test error') });
event.emit('e1', 'hello msg');

try {
    event.emit('e2');
} catch (error) {
    console.log('error caught!');
}

(async () => {
    event.emit('e2');
})().catch(() => console.log('error caught!2'));