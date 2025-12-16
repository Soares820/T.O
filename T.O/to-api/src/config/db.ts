// to-api/src/config/db.ts
import { PrismaClient } from "@prisma/client";

// exportamos como CONST com nome prisma (named export)
export const prisma = new PrismaClient();
