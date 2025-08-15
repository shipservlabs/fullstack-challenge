import { Db, Filter, Document, OptionalUnlessRequiredId } from 'mongodb';

export abstract class BaseModel<T extends Document = Document> {
  protected db: Db;

  abstract collectionName: string;

  public initialise(db: Db) {
    this.db = db;
  }

  public async create(data: OptionalUnlessRequiredId<T>) {
    const result = await this.db.collection<T>(this.collectionName).insertOne(data);

    return this.db
      .collection<T>(this.collectionName)
      .findOne({ _id: result.insertedId } as Filter<T>);
  }

  public async findAll(query: Filter<T>) {
    return this.db.collection<T>(this.collectionName).find(query).toArray();
  }

  public async findOne(query: Filter<T>) {
    return this.db.collection<T>(this.collectionName).findOne(query);
  }

  public async updateOne(query: Filter<T>, data: Partial<T>) {
    return this.db
      .collection<T>(this.collectionName)
      .findOneAndUpdate(query, { $set: data }, { returnDocument: 'after' });
  }

  public async deleteOne(query: Filter<T>) {
    return this.db.collection<T>(this.collectionName).deleteOne(query);
  }
}
