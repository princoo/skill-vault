import { z } from "zod"

export const taskSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required")
    .min(3, "Task name must be at least 3 characters")
    .max(100, "Task name must be less than 100 characters"),
  dueDate: z
    .string()
    .refine((date) => {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/
      return dateRegex.test(date)
    }, "Please enter a valid date in MM/DD/YYYY format"),
})

export type TaskFormData = z.infer<typeof taskSchema>
