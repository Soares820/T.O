// src/modules/assistant/assistant.controller.ts
import { Router } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import {
  assistantActivities,
  assistantBI,
  assistantChat,
  assistantReport,
} from "./assistant.service";

export const assistantRouter = Router();

// protege tudo com login
assistantRouter.use(authMiddleware);

// POST /assistant/chat
assistantRouter.post("/chat", async (req: AuthRequest, res) => {
  try {
    const { message, role } = req.body as {
      message: string;
      role?: "parent" | "clinic";
    };

    if (!message) {
      return res.status(400).json({ error: "message é obrigatório" });
    }

    const reply = await assistantChat({
      role: role || (req.user?.role === "CLINIC_ADMIN" || req.user?.role === "THERAPIST" ? "clinic" : "parent"),
      userId: req.user!.id,
      clinicId: req.user?.clinicId,
      patientId: req.user?.patientId,
      message,
    });

    return res.json({ reply });
  } catch (err: any) {
    console.error("Erro em /assistant/chat:", err);
    return res.status(500).json({ error: "Erro ao falar com o assistente" });
  }
});

// POST /assistant/report
assistantRouter.post("/report", async (req: AuthRequest, res) => {
  try {
    const { role } = req.body as { role?: "parent" | "clinic" };

    const report = await assistantReport({
      role: role || (req.user?.role === "CLINIC_ADMIN" || req.user?.role === "THERAPIST" ? "clinic" : "parent"),
      userId: req.user!.id,
      clinicId: req.user?.clinicId,
      patientId: req.user?.patientId,
    });

    return res.json({ report });
  } catch (err: any) {
    console.error("Erro em /assistant/report:", err);
    return res.status(500).json({ error: "Erro ao gerar relatório" });
  }
});

// POST /assistant/bi
assistantRouter.post("/bi", async (req: AuthRequest, res) => {
  try {
    const { role } = req.body as { role?: "parent" | "clinic" };

    const insight = await assistantBI({
      role: role || (req.user?.role === "CLINIC_ADMIN" || req.user?.role === "THERAPIST" ? "clinic" : "parent"),
      userId: req.user!.id,
      clinicId: req.user?.clinicId,
      patientId: req.user?.patientId,
    });

    return res.json({ insight });
  } catch (err: any) {
    console.error("Erro em /assistant/bi:", err);
    return res.status(500).json({ error: "Erro ao gerar BI" });
  }
});

// POST /assistant/activities
assistantRouter.post("/activities", async (req: AuthRequest, res) => {
  try {
    const { role, extraPrompt } = req.body as {
      role?: "parent" | "clinic";
      extraPrompt?: string;
    };

    const suggestions = await assistantActivities({
      role: role || (req.user?.role === "CLINIC_ADMIN" || req.user?.role === "THERAPIST" ? "clinic" : "parent"),
      userId: req.user!.id,
      clinicId: req.user?.clinicId,
      patientId: req.user?.patientId,
      extraPrompt,
    });

    return res.json({ suggestions });
  } catch (err: any) {
    console.error("Erro em /assistant/activities:", err);
    return res.status(500).json({ error: "Erro ao sugerir atividades" });
  }
});
