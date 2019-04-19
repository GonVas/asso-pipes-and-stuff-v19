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
          this.publishers.push(<Publisher><unknown> user);
      else
          this.subscribers.push(<Subscriber><unknown> user);
  }

  public getPublishers() {
      return this.publishers;
  }

  public getSubscribers() {
      return this.subscribers;
  }
}
