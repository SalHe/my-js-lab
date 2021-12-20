import { createQueue } from "./queue";

interface Task {
    name: string;
}

const queue = createQueue<Task>('hi');
queue.add({ name: 'task1' });