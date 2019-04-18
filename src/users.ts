export class Publisher{


    getwork(): Promise<string> {
        //delays random amount and then returns random string

        var delay = (Math.floor(Math.random() * 7)) + 2;
        delay*=500


        return new Promise<string>(resolve => {
            setTimeout(() => {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                
                for (var i = 0; i < 5; i++)
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
              
                resolve(text);
            }, delay)
        })


    }

}

export class Subscriber{

    id : Number;

    constructor(id:Number){
        this.id = id
    }

    async consumework(pwork:Promise<string>){
        let work = await pwork
        let review = "I subscriber " + this.id + " consumed work: " + work + " and liked it"
        console.log(review)
    }
}