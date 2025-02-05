import { Router } from "express";
import {
  createAnalyse,
  deleteAnalyse,
  getAnalyse,
  getAnalyseByBio,
  getAnalyses,
  getAnalysesBio,
  updateAnalyse,
} from "../controllers/analyse";

const router = Router();

router.post("/analyse", createAnalyse);
router.get("/analyse", getAnalyses);

router.get("/analyse/:id", getAnalyse);
router.put("/analyse/:id", updateAnalyse);
router.delete("/analyse/:id", deleteAnalyse);
router.get("/analyseBio/:id", getAnalyseByBio);
router.get("/analyseBio", getAnalysesBio);

export default router;
