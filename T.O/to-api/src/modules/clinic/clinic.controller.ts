// to-api/src/modules/clinic/clinic.controller.ts
import { Router } from "express";
import { prisma } from "../../config/db";
import { AuthRequest, authMiddleware } from "../../middleware/auth";


export const clinicRouter = Router();

clinicRouter.use(authMiddleware);

/**
 * GET /clinic/dashboard
 * Infos para a tela ClinicHome
 */
clinicRouter.get("/dashboard", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.clinicId) {
      return res.status(400).json({ message: "Usuário não vinculado a uma clínica" });
    }

    const clinicId = req.user.clinicId;

    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
    });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const crisesOpen = await prisma.crisis.count({
      where: { clinicId, status: "aberta" },
    });

    const crisesCritical = await prisma.crisis.count({
      where: { clinicId, status: "aberta", level: "critica" },
    });

    const sessionsToday = await prisma.session.count({
      where: { clinicId, startTime: { gte: todayStart } },
    });

    const sessionsMonth = await prisma.session.count({
      where: { clinicId, startTime: { gte: monthStart } },
    });

    return res.json({
      clinic,
      cards: {
        crisesOpen,
        crisesCritical,
        sessionsToday,
        sessionsMonth,
      },
    });
  } catch (err: any) {
    console.error("clinic/dashboard error", err);
    return res.status(500).json({ message: "Erro ao carregar dashboard da clínica" });
  }
});

/**
 * GET /clinic/metrics
 * BI cru para a tela ClinicBI
 */
clinicRouter.get("/metrics", async (req: AuthRequest, res) => {
  try {
    if (!req.user?.clinicId) {
      return res.status(400).json({ message: "Usuário não vinculado a uma clínica" });
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
      stats: {
        crisesThisMonth,
        sessionsThisMonth,
      },
    });
  } catch (err: any) {
    console.error("clinic/metrics error", err);
    return res.status(500).json({ message: "Erro ao carregar métricas da clínica" });
  }
});
