import { Index, Pinecone } from '@pinecone-database/pinecone';
import { PineconeConfig, Vector } from '@/config/vectorDB.js';

export default class VectorDBService {
  private client: Pinecone;
  private index: Index | undefined;

  private constructor() {
    this.client = new Pinecone({
      apiKey: PineconeConfig.apiKey
    });
  }

  public static async create(): Promise<VectorDBService> {
    const service = new VectorDBService();
    await service.initialize();
    return service;
  }

  private async initialize(): Promise<void> {
    try {
      await this.client.createIndex({
        name: PineconeConfig.index,
        dimension: PineconeConfig.dimension,
        metric: PineconeConfig.metric,
        spec: {
          serverless: PineconeConfig.serverless
        },
        suppressConflicts: true,
        waitUntilReady: true
      });

      this.index = this.client.index(PineconeConfig.index);
      console.log('Pinecone index initialized');
    } catch (error) {
      console.error('Error initializing Pinecone index:', error);
      throw error;
    }
  }

  public async upsertVectors(vectors: Vector[]): Promise<void> {
    if (!this.index) {
      throw new Error('Pinecone index is not initialized.');
    }

    try {
      await this.index.upsert(vectors);

      console.log(`Vectors upserted successfully.`);
    } catch (error) {
      console.error('Error upserting vectors:', error);
      throw error;
    }
  }

  public async queryVector(values: number[], topK = 3): Promise<any[]> {
    if (!this.index) {
      throw new Error('Pinecone index is not initialized.');
    }

    try {
      const response = await this.index.query({
        topK,
        vector: values,
        includeMetadata: true
      });

      return response.matches || [];
    } catch (error) {
      console.error('Error querying vector DB:', error);
      throw error;
    }
  }
}