import express from 'express';
import { AgentController } from '@/controllers/AgentController.js';

const router = express.Router();

const agentController = new AgentController('vectorDB', 'llmService');
router.post('/', (req, res) => agentController.handleQuery(req, res));

export default router;