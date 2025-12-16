// to-api/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import { clinicRouter } from "./modules/clinic/clinic.controller";
import { authRouter } from "./modules/auth/auth.controller";
import { parentRouter } from "./modules/parent/parent.controller";
import { biRouter } from "./modules/bi/bi.controller";
import { assistantRouter } from "./modules/assistant/assistant.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/parent", parentRouter);
app.use("/clinic", clinicRouter);
app.use("/bi", biRouter);
app.use("/assistant", assistantRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API T.o rodando na porta ${PORT}`);
});
