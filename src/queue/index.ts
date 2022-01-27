import { EventEmitter } from "stream";

export namespace SmQueue {

    export type JobId = number;

    export interface IJob<T> {
        id: JobId;
        data: T;
        queue: IQueue<T>;
        progress(): number;
        updateProgress(p: number): void;
        complete(): void;
    }

    class Job<T> implements IJob<T>{
        id: number;
        data: T;
        queue: IQueue<T>;

        private _progress: number = 0;
        private _updateProgress: (p: number) => void;
        private _complete: () => void;

        constructor(id: number, data: T, queue: IQueue<T>,
            updateProgress: (p: number) => void,
            complete: () => void) {
            this.id = id;
            this.data = data;
            this.queue = queue;
            this._updateProgress = updateProgress;
            this._complete = complete;
        }

        complete(): void {
            if (this._complete)
                this._complete();
        }

        progress(): number {
            return this._progress;
        }

        updateProgress(p: number): void {
            this._progress = p;
            if (this._updateProgress)
                this._updateProgress(p);
        }

    }

    export interface IQueue<T> {
        name: string;
        on(event: 'process', callback: JobCallbackFun<T>): this;
        on(event: 'progress', callback: JobCallbackFun1<T, number>): this;
        on(event: 'complete', callback: JobCallbackFun<T>): this;
        on(event: 'failed', callback: JobCallbackFun<T>): this;
        count(): number;
        add(job: T): void;
    }

    type JobCallbackFun<T> = (job: IJob<T>) => void;
    type JobCallbackFun1<T, V> = (job: IJob<T>, v: V) => void;
    type JobStatus = 'pending' | 'processing' | 'completed';

    interface OneJob<T> {
        status: JobStatus;
        job: IJob<T>;
    };

    class Queue<T> extends EventEmitter implements IQueue<T>{
        name: string;
        jobs: OneJob<T>[] = [];
        maxJobs: number;

        get runningJobs(): number {
            return this.jobs.filter(j => j.status === 'processing').length;
        }

        get pendingJobs(): number {
            return this.jobs.filter(j => j.status === 'pending').length;
        }

        get completedJobs(): number {
            return this.jobs.filter(j => j.status === 'completed').length;
        }

        constructor(name: string, maxJobs: number) {
            super();
            this.name = name;
            this.maxJobs = maxJobs;
        }

        count(): number {
            return this.jobs.length;
        }

        private updateProgress(job: IJob<T>, progress: number): void {
            this.emit('progress', job, progress);
        }

        private completeJob(oneJob: OneJob<T>): void {
            // update job's status and call the callback
            oneJob.status = 'completed';
            this.emit('complete', oneJob.job);

            // start processing next job
            if (this.pendingJobs > 0) {
                const nextJob = this.jobs.find(j => j.status === 'pending');
                if (nextJob) {
                    this.processOneJob(nextJob);
                }
            }
        }

        private async processOneJob(oneJob: OneJob<T>) {
            oneJob.status = 'processing';
            this.emit('process', oneJob.job);
        }

        add(jobData: T): void {
            // create job and queue it
            const jobId = this.jobs.length;
            const job = new Job(
                jobId, jobData, this,
                (progress: number) => this.updateProgress(this.jobs[jobId].job, progress),
                () => this.completeJob(this.jobs[jobId])
            );
            const oneJob: OneJob<T> = {
                status: 'pending',
                job: job
            };
            this.jobs.push(oneJob);

            // start processing if possible
            if (this.runningJobs < this.maxJobs) {
                this.processOneJob(oneJob);
            }
        }
    }

    export function createQueue<T>(options: {
        name: string,
        maxJobs?: number
    }): SmQueue.IQueue<T> {
        return new Queue<T>(
            options.name,
            options.maxJobs || 10
        );
    }

}

export const createQueue = SmQueue.createQueue;
export default SmQueue;