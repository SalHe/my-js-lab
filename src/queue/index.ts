

export namespace SmQueue {

    export type JobId = number;

    export interface IJob<T> {
        id: JobId;
        data: T;
        queue: IQueue<T>;
        progress(): number;
        progress(p: number): void;
    }

    export interface IQueue<T> {
        name: string;
        process(callback: (job: IJob<T>) => void): void;
        count(): number;
        add(job: T): void;
    }

    class Queue<T> implements IQueue<T>{
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        process(callback: (job: IJob<T>) => void): void {
            throw new Error("Method not implemented.");
        }

        count(): number {
            throw new Error("Method not implemented.");
        }

        add(job: T): void {
            throw new Error("Method not implemented.");
        }

    }

    export function createQueue<T>(name: string): SmQueue.IQueue<T> {
        return new Queue<T>(name);
    }

}

export const createQueue = SmQueue.createQueue;
export default SmQueue;