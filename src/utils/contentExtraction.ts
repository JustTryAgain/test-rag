import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

const cleanText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces/newlines with a single space
    .trim(); // Trim leading/trailing whitespace
};

export const extractContent = async (url: string): Promise<{ title: string; content: string; url: string }> => {
  try {
    // Fetch HTML content
    const response = await axios.get(url);

    // Parse HTML with JSDOM
    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);

    // Extract article content
    const article = reader.parse();
    if (!article) {
      throw new Error('Failed to extract article content');
    }

    return {
      title: cleanText(article.title),
      content: cleanText(article.textContent || ''),
      url,
    };
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error);
    throw new Error('Failed to extract content');
  }
};