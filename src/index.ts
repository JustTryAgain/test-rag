import app from '@/app.js';
import 'dotenv/config'
import VectorDBService from '@/services/vectorDB/VectorDBService.js';

(async () => {
  try {
    // const vectorDBService = await VectorDBService.create();

    app.listen(process.env.APP_PORT, () => {
      console.log(`🚀 Server started on ${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the application:', error);
    process.exit(1);
  }
})();