import mongoose from 'mongoose';

class DataBase {
    private dbName : string;
    private mongoUrl : string;

    constructor(){
        this.dbName = 'biblioteca';
        this.mongoUrl =  'mongodb://localhost:27017/' + this.dbName;
        
    }

    connect(): void{
        mongoose.connect(process.env.MONGODB_URL || this.mongoUrl, {
            useCreateIndex: true, 
            useNewUrlParser: true 
        })
        .then(db => console.log('DataBase is conected'))
    }
}

export default new DataBase();