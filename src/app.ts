import express from 'express';
import path from 'path';
import agentRoutes from '@/routes/agentRoutes.js';
import { extractContent } from '@/utils/contentExtraction.js';

const __dirname = import.meta.dirname;
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// extractContent("https://economictimes.indiatimes.com/news/international/us/thailand-becomes-first-southeast-asian-country-to-legalize-same-sex-marriage-historic-step-for-lgbtq-rights/articleshow/117495194.cms").then(console.log).catch(console.error);
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.use('/agent', agentRoutes);

export default app;