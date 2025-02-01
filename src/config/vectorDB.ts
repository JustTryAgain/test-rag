import { CreateIndexRequestMetricEnum } from '@pinecone-database/pinecone';
import { CreateIndexServerlessSpec } from '@pinecone-database/pinecone/dist/control/index.js';

if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX) {
  throw new Error('Missing required Pinecone configuration in environment variables.');
}

interface PineconeConfig {
  apiKey: string;
  index: string;
  dimension: number;
  metric: CreateIndexRequestMetricEnum;
  serverless: CreateIndexServerlessSpec;
}

export interface Vector {
  id: string,
  values: number[],
  metadata: Record<string, any>
}

export const PineconeConfig: PineconeConfig = {
  apiKey: process.env.PINECONE_API_KEY,
  index: process.env.PINECONE_INDEX,
  dimension: 768, // e.g., Gemini's text-embedding-004
  metric: 'cosine',
  serverless: {
    cloud: 'aws',
    region: 'us-east-1'
  }
};
