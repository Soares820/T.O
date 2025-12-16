// to-api/src/modules/auth/auth.controller.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { AuthRequest, authMiddleware } from "../../middleware/auth";




export const authRouter = Router();

/**
 * POST /auth/register-clinic
 * Cria uma clínica + usuário CLINIC_ADMIN
 */
authRouter.post("/register-clinic", async (req, res) => {
  try {
    const { clinicName, adminName, email, password } = req.body;

    if (!clinicName || !adminName || !email || !password) {
      return res.status(400).json({ message: "Dados obrigatórios faltando" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const clinic = await prisma.clinic.create({
      data: {
        name: clinicName,
        users: {
          create: {
            name: adminName,
            email,
            password: hash,
            role: "CLINIC_ADMIN",
          },
        },
      },
      include: {
        users: true,
      },
    });

    const admin = clinic.users[0];

    const token = jwt.sign(
      {
        sub: admin.id,
        role: admin.role,
        clinicId: clinic.id,
        patientId: null,
      },
      process.env.JWT_SECRET || "12345678",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: admin.id,
        name: admin.name,
        role: admin.role,
        clinicId: clinic.id,
        patientId: null,
      },
    });
  } catch (err: any) {
    console.error("register-clinic error", err);
    return res.status(500).json({ message: "Erro ao registrar clínica" });
  }
});

/**
 * POST /auth/register-parent
 * Cria usuário PARENT vinculado a um Patient e Clinic já existentes
 */
authRouter.post("/register-parent", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.user?.role !== "CLINIC_ADMIN" && req.user?.role !== "THERAPIST") {
      return res.status(403).json({ message: "Apenas clínica pode convidar pais" });
    }

    const { name, email, password, patientId } = req.body;

    if (!name || !email || !password || !patientId) {
      return res.status(400).json({ message: "Dados obrigatórios faltando" });
    }

    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        clinicId: req.user!.clinicId!,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Paciente não encontrado para esta clínica" });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role: "PARENT",
        clinicId: req.user!.clinicId,
        patientId: patient.id,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      clinicId: user.clinicId,
      patientId: user.patientId,
    });
  } catch (err: any) {
    console.error("register-parent error", err);
    return res.status(500).json({ message: "Erro ao registrar pai/mãe" });
  }
});

/**
 * POST /auth/login
 */
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { clinic: true, patient: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        clinicId: user.clinicId,
        patientId: user.patientId,
      },
      process.env.JWT_SECRET || "12345678",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        clinicId: user.clinicId,
        patientId: user.patientId,
      },
    });
  } catch (err: any) {
    console.error("login error", err);
    return res.status(500).json({ message: "Erro ao realizar login" });
  }
});

/**
 * GET /auth/me
 */
authRouter.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { clinic: true, patient: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      clinicId: user.clinicId,
      patientId: user.patientId,
      clinic: user.clinic,
      patient: user.patient,
    });
  } catch (err: any) {
    console.error("me error", err);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});
