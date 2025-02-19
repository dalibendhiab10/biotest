import { Router } from "express";
import {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient";


const router = Router();
import { authenticateToken } from "../middlewares/authMiddleware";
router.use(authenticateToken);

router.post("/patients/:id_analyse", addPatient);
router.get("/patients", getPatients);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

export default router;
