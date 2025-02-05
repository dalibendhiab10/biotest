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
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/analyse", authenticateToken, createAnalyse);
router.get("/analyse", authenticateToken, getAnalyses);

router.get("/analyse/:id", authenticateToken, getAnalyse);
router.put("/analyse/:id", authenticateToken, updateAnalyse);
router.delete("/analyse/:id", authenticateToken, deleteAnalyse);
router.get("/analyseBio/:id", authenticateToken, getAnalyseByBio);
router.get("/analyseBio", authenticateToken, getAnalysesBio);

export default router;
