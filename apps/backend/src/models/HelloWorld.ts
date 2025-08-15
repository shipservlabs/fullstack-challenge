import { BaseModel } from './BaseModel';

import { IHelloItem } from '../types';

class HelloWorldModel extends BaseModel<IHelloItem> {
  collectionName = 'helloWorlds';
}

export default new HelloWorldModel();
