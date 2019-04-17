export class Message {
    constructor(public readonly value: any) { }
    static none = new Message(null)
}

interface AsyncQueue<T> {
    enqueue(elem: T): void
    dequeue(): Promise<T>
} 

class UnboundedQueue implements AsyncQueue<string>{
    queue: Array<string> = new Array<string>();
    promises: Array<(value: string) => void> = new Array<(value: string) => void>();

    enqueue(msg: string): void {
        if(this.promises.length>0)
            this.promises.shift()(msg);
        else
            this.queue.push(msg);

    }

    async dequeue(): Promise<string> {
        return new Promise<string>((resolve) => {
            if (this.queue.length>0) {
                resolve(this.queue.shift());
            } else {
                this.promises.push(resolve);
            }
        });
    }


}