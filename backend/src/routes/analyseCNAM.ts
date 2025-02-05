import { Router } from 'express';
import { getAnalyseByCodeCNAM } from '../controllers/analyseCNAM';

const router = Router();

router.get('/analyse_cnam/:codeCNAM', getAnalyseByCodeCNAM);

export default router;
