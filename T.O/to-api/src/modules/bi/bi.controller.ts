// to-api/src/modules/bi/bi.controller.ts
import { Router } from "express";
import { prisma } from "../../config/db";
import { AuthRequest, authMiddleware } from "../../middleware/auth";

export const biRouter = Router();

biRouter.use(authMiddleware);

/**
 * GET /bi/parent
 * Mesmo dado do /parent/metrics, mas centralizado aqui
 */
biRouter.get("/parent", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.patientId) {
      return res.status(400).json({ message: "Usuário não vinculado a paciente" });
    }

    const snapshots = await prisma.metricSnapshot.findMany({
      where: { patientId: req.user.patientId, scope: "patient_global" },
      orderBy: { date: "asc" },
    });

    return res.json({ snapshots });
  } catch (err: any) {
    console.error("bi/parent error", err);
    return res.status(500).json({ message: "Erro ao carregar BI do paciente" });
  }
});

/**
 * GET /bi/clinic
 * Mesmo dado do /clinic/metrics, mas via módulo BI
 */
biRouter.get("/clinic", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.clinicId) {
      return res.status(400).json({ message: "Usuário não vinculado a clínica" });
    }

    const clinicId = req.user.clinicId;

    const global = await prisma.metricSnapshot.findMany({
      where: { clinicId, scope: "clinic_global" },
      orderBy: { date: "asc" },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const crisesThisMonth = await prisma.crisis.count({
      where: { clinicId, createdAt: { gte: startOfMonth } },
    });

    const sessionsThisMonth = await prisma.session.count({
      where: { clinicId, startTime: { gte: startOfMonth } },
    });

    return res.json({
      global,
      stats: { crisesThisMonth, sessionsThisMonth },
    });
  } catch (err: any) {
    console.error("bi/clinic error", err);
    return res.status(500).json({ message: "Erro ao carregar BI da clínica" });
  }
});
