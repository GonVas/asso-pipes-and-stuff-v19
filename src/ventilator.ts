export interface Observer {
    notify(pwork: Promise<string>): void;
}

class Ventilator {
    private observers: Observer[] =[];
    
    public register(observer: Observer): void {
        console.log(observer, "is pushed!");
        this.observers.push(observer);
    }

    public notify(): void {

    }
}