const {MongoClient} = require ("mongodb");


module.exports = {
    selectDB : {},
    async connect(){
        try{
            const client = await MongoClient.connect(process.env.MONGODB_URL);
            this.selectDB = client.db("guvi");
            console.log(this.selectDB);

        }catch(err){
            console.error(err);
        }
    }
}