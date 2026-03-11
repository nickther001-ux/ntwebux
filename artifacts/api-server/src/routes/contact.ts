import { Router, type IRouter } from "express";
import { SubmitContactFormBody, SubmitContactFormResponse } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactFormBody.parse(req.body);

    const [inserted] = await db
      .insert(contactsTable)
      .values({
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        email: body.email,
        phone: body.phone ?? null,
        service: body.service ?? null,
        message: body.message,
      })
      .returning({ id: contactsTable.id });

    const data = SubmitContactFormResponse.parse({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: inserted.id,
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: "Invalid request. Please check your inputs." });
  }
});

export default router;
