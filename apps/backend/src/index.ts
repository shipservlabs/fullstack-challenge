import express from 'express';

import { HelloWorldController } from './controllers';
import { ModelInitialiser } from './models';

class Main {
  public async initialise() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await ModelInitialiser.initialise();

    this.setupControllers(app);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }

  private setupControllers(app: express.Application) {
    const helloWorldController = new HelloWorldController();

    app.use('/api/hello-world', helloWorldController.getRouter());
  }
}

new Main().initialise().catch(console.error);
