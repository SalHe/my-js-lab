import { createQueue } from "./queue";

interface MyTask {
    name: string;
}

const queue = createQueue<MyTask>({
    name: "my-task-queue",
    maxJobs: 3
});

queue.onProcess(
    job => {
        console.log(`Start processing ${job.data.name}`);
        (() => {
            let progress = 0;
            let timer = setInterval(() => {
                progress += Math.floor(Math.random() * 3);
                if (progress >= 10) {
                    clearInterval(timer);
                    job.complete();
                    return;
                }
                job.updateProgress(progress);
            }, 100);
        })();
    })
    .onProgressUpdated(job => console.log(`Progress updated ${job.data.name} ... ${job.progress()}`))
    .onCompleted(job => console.log(`Completed ${job.data.name}`));

queue.add({ name: 'task1' });
queue.add({ name: 'task2' });
queue.add({ name: 'task3' });
queue.add({ name: 'task4' });
queue.add({ name: 'task5' });
queue.add({ name: 'task6' });
queue.add({ name: 'task7' });
queue.add({ name: 'task8' });
queue.add({ name: 'task9' });

console.log("Task added over!");