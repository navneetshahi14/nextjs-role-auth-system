import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { restrictTo } from "../middleware/role.middleware";
import {
  contactHr,
  getAllHrs,
  getAllUsers,
  getMyClients,
} from "../controller/user.controller";

const router = express.Router();

router.get("/hrs", authMiddleware, restrictTo("client"), getAllHrs);
router.post("/contact", authMiddleware, restrictTo("client"), contactHr);

router.get("/my-clients", authMiddleware, restrictTo("Hr"), getMyClients);

router.get("/all-users", authMiddleware, restrictTo("admin"), getAllUsers);

export default router;
