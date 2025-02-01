// import { extractContent, cleanContent } from '../utils/contentExtraction';
// import { generateEmbedding, storeInVectorDB } from '../services/vectorDBService';
//
// export const processNewsLink = async (link: string) => {
//   try {
//     // Step 1: Extract content from the link
//     const rawContent = await extractContent(link);
//
//     // Step 2: Clean and structure the content
//     const cleanedArticle = await cleanContent(rawContent);
//
//     // Step 3: Generate embedding and store in Pinecone
//     const embedding = await generateEmbedding(cleanedArticle.content);
//     await storeInVectorDB({ ...cleanedArticle, embedding });
//
//     console.log(`Processed and stored article: ${cleanedArticle.title}`);
//   } catch (error) {
//     console.error(`Error processing link ${link}:`, error);
//   }
// };