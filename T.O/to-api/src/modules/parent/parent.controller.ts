// to-api/src/modules/parent/parent.controller.ts
import { Router } from "express";
import { prisma } from "../../config/db";
import { AuthRequest, authMiddleware } from "../../middleware/auth";


export const parentRouter = Router();

parentRouter.use(authMiddleware);

/**
 * GET /parent/dashboard
 * Infos para a tela ParentHome (que já fizemos no app)
 */
parentRouter.get("/dashboard", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.patientId) {
      return res.status(400).json({ message: "Usuário não vinculado a um paciente" });
    }

    const patientId = req.user.patientId;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { clinic: true },
    });

    const nextSession = await prisma.session.findFirst({
      where: { patientId, startTime: { gte: new Date() } },
      orderBy: { startTime: "asc" },
    });

    const lastCrisis = await prisma.crisis.findFirst({
      where: { patientId },
      orderBy: { createdAt: "desc" },
    });

    const latestMetric = await prisma.metricSnapshot.findFirst({
      where: { patientId, scope: "patient_global" },
      orderBy: { date: "desc" },
    });

    return res.json({
      patient,
      nextSession,
      lastCrisis,
      summary: {
        evolution: latestMetric?.value ?? null,
      },
    });
  } catch (err: any) {
    console.error("parent/dashboard error", err);
    return res.status(500).json({ message: "Erro ao carregar dashboard da família" });
  }
});

/**
 * GET /parent/metrics
 * BI cru para a tela ParentBI (o front consome e desenha)
 */
parentRouter.get("/metrics", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.patientId) {
      return res.status(400).json({ message: "Usuário não vinculado a um paciente" });
    }

    const patientId = req.user.patientId;

    const snapshots = await prisma.metricSnapshot.findMany({
      where: {
        patientId,
        scope: "patient_global",
      },
      orderBy: { date: "asc" },
    });

    return res.json({ snapshots });
  } catch (err: any) {
    console.error("parent/metrics error", err);
    return res.status(500).json({ message: "Erro ao carregar métricas da família" });
  }
});
