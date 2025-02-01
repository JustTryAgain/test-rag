import { Request, Response } from 'express';
// import { Article } from './types';
interface Article {
  title: string;
  content: string;
  url: string;
  date: string;
}

interface AgentResponse {
  answer: string;
  sources: {
    title: string;
    url: string;
    date: string;
  }[];
}

export class AgentController {
  private readonly vectorDB: any;
  private readonly llmService: any;

  constructor(vectorDB: any, llmService: any) {
    this.vectorDB = vectorDB;
    this.llmService = llmService;
  }

  async handleQuery(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.generateResponse(req.body.query);
      res.status(200).json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async generateResponse(query: string): Promise<AgentResponse> {
    const articles = await this.retrieveRelevantArticles(query);
    const answer = await this.generateAnswer(query, articles);

    return {
      answer,
      sources: this.formatSources(articles)
    };
  }

  private async retrieveRelevantArticles(query: string): Promise<Article[]> {
    return this.vectorDB.retrieve(query);
  }

  private async generateAnswer(query: string, articles: Article[]): Promise<string> {
    return this.llmService.generate(query, articles);
  }

  private formatSources(articles: Article[]) {
    return articles.map(article => ({
      title: article.title,
      url: article.url,
      date: article.date
    }));
  }

  private handleError(error: unknown, res: Response): void {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
}