import express from 'express';
import cors from 'cors';

import { HelloWorldController } from './controllers';
import { ModelInitialiser } from './models';

class Main {
  public async initialise() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await ModelInitialiser.initialise();

    this.setupControllers(app);

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  }

  private setupControllers(app: express.Application) {
    const helloWorldController = new HelloWorldController();

    app.use('/api/hello-world', helloWorldController.getRouter());
  }
}

new Main().initialise().catch(console.error);
