import { UnboundedQueue } from "./queue";
import { Subscriber } from "./users";
import { Publisher } from "./users";
import { worker } from "cluster";


export class Registry {

  private pubs: Publisher[] = [];
  private subs: Subscriber[] = [];

  constructor(){

  }

  public addUser<User>(user: User) {
      if (user.constructor.name == "Publisher")
          this.pubs.push(<Publisher><unknown> user);
      else
          this.subs.push(<Subscriber><unknown> user);
  }

  public getPublishers() {
      return this.pubs;
  }

  public getSubscribers() {
      return this.subs;
  }
}
