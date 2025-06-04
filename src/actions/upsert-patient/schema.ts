import { z } from "zod";

export const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  phoneNumber: z.string().min(1, {
    message: "Telefone é obrigatório",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gênero é obrigatório",
  }),
});
