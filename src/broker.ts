import { UnboundedQueue  } from "./queue";
import { Subscriber, SpecilalityPublisher } from "./users";
import { worker } from "cluster";
import { relative } from "path";
import { type } from "os";


class UserQueue {

    user:any
    queue:UnboundedQueue
    type:string

    constructor(user:any, type:string){
        this.user = user
        this.queue = new UnboundedQueue()
        this.type = type
    }

    getUser():any{
        return this.user
    }

    getQueue():UnboundedQueue{
        return this.queue
    }

    getType():string{
        return this.type
    }

}

export class Broker {

    public name: string;

    private pubqueues: Array<UserQueue>;
    private subqueues: Array<UserQueue>;

    constructor(name: string) {
        this.name = name
        this.pubqueues = new Array<UserQueue>();
        this.subqueues = new Array<UserQueue>();
    }

    public addSpecPub(specpub:SpecilalityPublisher ){
        let uq = new UserQueue(specpub, specpub.getSpeciality())
        this.pubqueues.push(uq)
    }

    public addSub(sub:Subscriber, wants:string ): boolean{
        
        if(this.getPubTypes().includes(wants)){
            let new_subqueue = new UserQueue(sub, wants)
            this.subqueues.push(new_subqueue)
            return true;
        }

        return false;
    }

    public getPubTypes(): Array<String>{

        let types = new Array<String>()

        for (let i = 0; i < this.pubqueues.length; i++) {
            const pubq = this.pubqueues[i];
            types.push(pubq.getType())
        }

        return types
    }


    public async start_publishing(max_works:Number){

        for (let i = 0; i < max_works; i++) {

            for (let j = 0; j < this.pubqueues.length; j++) {
                
                const pub = this.pubqueues[j];

                const work = await pub.getUser().getwork();
                pub.getQueue().enqueue(work)
                console.log("P"+ j + " published : " + work)
                
            }

        }
    }


    public async start_notifying(max_works:Number, todelete:boolean) {
        

        for (let pub_i = 0; pub_i < this.pubqueues.length; pub_i++) {
            const pubqueue = this.pubqueues[pub_i];

            for (let i = 0; i < max_works; i++) {
                let work = await pubqueue.getQueue().dequeue()

                for (let j = 0; j < this.subqueues.length; j++) {
                    const sub = this.subqueues[j];
                    if(pubqueue.getType() == sub.getType()){
                        sub.getUser().consumework_now(work)
                    }
                    
                }
  
            }
            
        }




    }


}
