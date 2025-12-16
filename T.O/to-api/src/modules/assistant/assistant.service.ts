// src/modules/assistant/assistant.service.ts
import OpenAI from "openai";
import { prisma } from "../../config/db";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type RoleType = "parent" | "clinic";

interface BaseContext {
  role: RoleType;
  userId: string;
  clinicId?: string | null;
  patientId?: string | null;
}

// ------------ PEGA CONTEXTO NO BANCO PARA IA ------------

async function buildParentContext(ctx: BaseContext) {
  if (!ctx.patientId) return "Usuário não está vinculado a um paciente.";

  const patient = await prisma.patient.findUnique({
    where: { id: ctx.patientId },
    include: { clinic: true },
  });

  const sessions = await prisma.session.findMany({
    where: { patientId: ctx.patientId },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  const crises = await prisma.crisis.findMany({
    where: { patientId: ctx.patientId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const metrics = await prisma.metricSnapshot.findMany({
    where: { patientId: ctx.patientId, scope: "patient_global" },
    orderBy: { date: "asc" },
    take: 12,
  });

  const goals = await prisma.therapyGoal.findMany({
    where: { patientId: ctx.patientId, active: true },
    take: 10,
  }).catch(() => []);

  const dailyLogs = await prisma.dailyLog.findMany({
    where: { patientId: ctx.patientId },
    orderBy: { date: "desc" },
    take: 10,
  }).catch(() => []);

  return {
    patient,
    sessions,
    crises,
    metrics,
    goals,
    dailyLogs,
  };
}

async function buildClinicContext(ctx: BaseContext) {
  if (!ctx.clinicId) return "Usuário não está vinculado a uma clínica.";

  const clinic = await prisma.clinic.findUnique({
    where: { id: ctx.clinicId },
  });

  const activePatients = await prisma.patient.count({
    where: { clinicId: ctx.clinicId },
  });

  const lastMonthCrises = await prisma.crisis.count({
    where: {
      clinicId: ctx.clinicId,
      createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
  });

  const lastMonthSessions = await prisma.session.count({
    where: {
      clinicId: ctx.clinicId,
      startTime: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
  });

  const globalMetrics = await prisma.metricSnapshot.findMany({
    where: { clinicId: ctx.clinicId, scope: "clinic_global" },
    orderBy: { date: "asc" },
    take: 12,
  });

  return {
    clinic,
    activePatients,
    lastMonthCrises,
    lastMonthSessions,
    globalMetrics,
  };
}

// ------------ PROMPTS DE SISTEMA ------------

function buildSystemPrompt(role: RoleType, mode: "chat" | "report" | "bi" | "activities") {
  if (role === "parent") {
    if (mode === "report") {
      return `
Você é um assistente especializado em Terapia Ocupacional focado em famílias de crianças autistas (TEA).
Sua tarefa é gerar um RELATÓRIO CLARO e ACOLHEDOR sobre a evolução da criança, usando os dados fornecidos (sessões, crises, métricas, metas, registros diários).

Regras:
- Use linguagem simples, em português do Brasil.
- Evite termos técnicos difíceis; se usar, explique.
- Não faça diagnóstico médico, nem prescreva remédio.
- Foque em:
  - avanços
  - pontos de atenção
  - sugestões práticas para o dia a dia em casa.
      `;
    }

    if (mode === "bi") {
      return `
Você é um assistente de BI para pais de crianças autistas dentro de uma plataforma de T.O.
Sua função é interpretar números de evolução e transformar em texto compreensível e acolhedor, sem alarmismo.

Regras:
- Explique o que significam percentuais e tendências.
- Dê exemplos práticos de situações do dia a dia.
- Sempre reforce que cada criança tem seu tempo.
- Nunca culpe a família.
      `;
    }

    if (mode === "activities") {
      return `
Você é um assistente de T.O que sugere atividades para pais realizarem com a criança em casa.
Use informações de idade, diagnóstico resumido, metas e comportamento.
Regras:
- Sugira de 2 a 5 atividades.
- Diga o tempo aproximado de cada uma.
- Diga qual habilidade trabalha (ex: comunicação, coordenação motora fina, autonomia).
- Seja realista para famílias ocupadas.
      `;
    }

    return `
Você é um assistente acolhedor para pais de crianças autistas, dentro de uma plataforma de Terapia Ocupacional (T.O).
Responda em português do Brasil, com empatia e foco em orientações práticas.
Não faça diagnósticos médicos, nem substitua o profissional.
Sempre que possível, conecte a resposta com rotina, brincadeiras e comunicação.
    `;
  } else {
    // CLINIC
    if (mode === "report") {
      return `
Você é um assistente de apoio para profissionais de Terapia Ocupacional e saúde mental em uma clínica.
Sua tarefa é gerar um RELATÓRIO TÉCNICO RESUMIDO usando os dados de sessões, crises, métricas, metas e registros.

Regras:
- Tom profissional, organizado em seções (Ex: "Visão geral", "Evolução", "Pontos de atenção", "Recomendações").
- Não substitua laudo oficial.
- Pode sugerir linhas de intervenção, mas sem prescrição médica.
      `;
    }

    if (mode === "bi") {
      return `
Você é um assistente de BI clínico para uma equipe de Terapia Ocupacional.
Sua função é interpretar indicadores da clínica (pacientes ativos, crises, sessões, métricas globais) e gerar insights de gestão.

Regras:
- Foque em tendências (melhora, piora, estabilidade).
- Aponte riscos e gargalos (ex: carga desequilibrada por terapeuta, aumento de crises).
- Sugira ações gerenciais (reuniões de equipe, revisão de protocolos, capacitações).
      `;
    }

    if (mode === "activities") {
      return `
Você é um assistente de apoio para terapeutas ocupacionais.
Sua função é sugerir atividades terapêuticas baseadas em metas, idade e contexto do paciente.

Regras:
- Liste atividades com objetivo terapêutico claro.
- Estruture cada sugestão em: "Objetivo", "Descrição", "Materiais", "Adaptações".
- Assuma que quem lê é um profissional, pode usar termos técnicos.
      `;
    }

    return `
Você é um assistente de apoio para profissionais de clínicas de Terapia Ocupacional e saúde mental.
Responda de forma técnica, objetiva e respeitosa.
Ajude com raciocínio clínico, organização de agenda, análise de dados e comunicação com famílias.
Nunca substitua decisões clínicas ou diagnósticos formais.
    `;
  }
}

// ------------ CHAMADAS À OPENAI ------------

export async function assistantChat(opts: {
  role: RoleType;
  userId: string;
  clinicId?: string | null;
  patientId?: string | null;
  message: string;
}) {
  const ctx: BaseContext = {
    role: opts.role,
    userId: opts.userId,
    clinicId: opts.clinicId,
    patientId: opts.patientId,
  };

  const contextData =
    opts.role === "parent"
      ? await buildParentContext(ctx)
      : await buildClinicContext(ctx);

  const systemPrompt = buildSystemPrompt(opts.role, "chat");

  const response = await client.responses.create({
    model: "gpt-5.1-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content:
          "Contexto estruturado em JSON (dados do app):\n" +
          JSON.stringify(contextData, null, 2) +
          "\n\nPergunta do usuário:\n" +
          opts.message,
      },
    ],
    reasoning: { effort: "medium" },
    text: { verbosity: "medium" },
  });

  const outputText = (response.output[0] as any).content[0].text;
  return outputText;
}

export async function assistantReport(opts: {
  role: RoleType;
  userId: string;
  clinicId?: string | null;
  patientId?: string | null;
}) {
  const ctx: BaseContext = {
    role: opts.role,
    userId: opts.userId,
    clinicId: opts.clinicId,
    patientId: opts.patientId,
  };

  const contextData =
    opts.role === "parent"
      ? await buildParentContext(ctx)
      : await buildParentContext(ctx); // relatório sempre baseado no paciente

  const systemPrompt = buildSystemPrompt(opts.role, "report");

  const response = await client.responses.create({
    model: "gpt-5.1-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content:
          "Use este contexto para gerar um relatório:\n" +
          JSON.stringify(contextData, null, 2),
      },
    ],
    reasoning: { effort: "medium" },
    text: { verbosity: "high" },
  });

  const outputText = (response.output[0] as any).content[0].text;
  return outputText;
}

export async function assistantBI(opts: {
  role: RoleType;
  userId: string;
  clinicId?: string | null;
  patientId?: string | null;
}) {
  const ctx: BaseContext = {
    role: opts.role,
    userId: opts.userId,
    clinicId: opts.clinicId,
    patientId: opts.patientId,
  };

  const contextData =
    opts.role === "parent"
      ? await buildParentContext(ctx)
      : await buildClinicContext(ctx);

  const systemPrompt = buildSystemPrompt(opts.role, "bi");

  const response = await client.responses.create({
    model: "gpt-5.1-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content:
          "Interprete estes dados e gere insights de BI:\n" +
          JSON.stringify(contextData, null, 2),
      },
    ],
    reasoning: { effort: "medium" },
    text: { verbosity: "medium" },
  });

  const outputText = (response.output[0] as any).content[0].text;
  return outputText;
}

export async function assistantActivities(opts: {
  role: RoleType;
  userId: string;
  clinicId?: string | null;
  patientId?: string | null;
  extraPrompt?: string;
}) {
  const ctx: BaseContext = {
    role: opts.role,
    userId: opts.userId,
    clinicId: opts.clinicId,
    patientId: opts.patientId,
  };

  const contextData =
    opts.role === "parent"
      ? await buildParentContext(ctx)
      : await buildParentContext(ctx); // atividades sempre focadas no paciente

  const systemPrompt = buildSystemPrompt(opts.role, "activities");

  const response = await client.responses.create({
    model: "gpt-5.1-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content:
          "Sugira atividades com base nesses dados e nessa observação opcional do usuário:\n" +
          JSON.stringify(contextData, null, 2) +
          "\n\nObservação extra:\n" +
          (opts.extraPrompt || "Sem observação extra."),
      },
    ],
    reasoning: { effort: "low" },
    text: { verbosity: "medium" },
  });

  const outputText = (response.output[0] as any).content[0].text;
  return outputText;
}
