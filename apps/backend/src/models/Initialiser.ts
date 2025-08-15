import { MongoClient, Db } from 'mongodb';

import HelloWorldModel from './HelloWorld';

class Initialiser {
  private client: MongoClient;
  private db: Db;

  public async initialise() {
    const MONGO_URL = 'mongodb://fullstack_user:fullstack_password@localhost:27017';
    const DATABASE_NAME = 'fullstack_challenge';

    this.client = new MongoClient(MONGO_URL);
    await this.client.connect();
    this.db = this.client.db(DATABASE_NAME);
    console.log('✅ Connected to MongoDB');

    this.setupModels();
  }

  private setupModels() {
    HelloWorldModel.initialise(this.db);
  }
}

export default new Initialiser();
