"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { schema } from "./schema";

export const upsertPatient = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.clinic) {
      throw new Error("Unauthorized");
    }

    const { id, ...data } = parsedInput;

    if (id) {
      // Update
      await db
        .update(patientsTable)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(patientsTable.id, id));
    } else {
      // Create
      await db.insert(patientsTable).values({
        ...data,
        clinicId: session.user.clinic.id,
      });
    }

    revalidatePath("/patients");
  });
