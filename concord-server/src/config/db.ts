import { connect } from "mongoose";

class ContentDatabase {
  private url:string;

  constructor(){
    this.url = process.env.MONGO_DB_URL as string;
  }

  public async connection(){
    await connect(this.url)
    .then(() => console.log("connected to database"))
    .catch(() => console.log("unable to connect database"))
  }

}

export const database = new ContentDatabase();
