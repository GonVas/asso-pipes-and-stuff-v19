import { UnboundedQueue } from "./queue";
import { Subscriber } from "./users";
import { worker } from "cluster";

export interface Observer {
    notify(pwork: Promise<string>): void;
}

export class Ventilator {
    private subs: Subscriber[] =[];

    private queue: UnboundedQueue;
    private history: Array<String> = [];
    

    constructor(queue:UnboundedQueue){
        this.queue = queue
    }

    public register(sub: Subscriber): void {
        console.log(sub.id, " sub is subscribed to work!");
        this.subs.push(sub);
    }

    public async start_notifying(max_works:Number, todelete:boolean) {
        
        for (let i = 0; i < max_works; i++) {
            let work = await this.queue.dequeue()
            //let review = "I subscriber " + this.id + " consumed work: " + work + " and liked it"
            for (let j = 0; j < this.subs.length; j++) {
                const sub = this.subs[j];
                if(work.includes(sub.id.toString())){
                    sub.consumework_now(work)
                }
                
            }

            if(todelete == false){
                this.history.push(work)
            }
        }


    }

    public notify(): void {

    }
}