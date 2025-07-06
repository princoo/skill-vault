"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInput } from "@/components/ui/FormInput";
import { FormField } from "@/components/ui/FormField";
import { taskSchema, type TaskFormData } from "@/lib/validations/taskSchema";
import Button from "./ui/Button";
import { onSubmitErrorMessage } from "@/lib/utils/errorUtils";
import { formatDateToISO } from "@/lib/utils/dateUtils";

export default function AddTaskForm({ skillId }: { skillId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    data.dueDate = formatDateToISO(data.dueDate as string);
    try {
      const response = await fetch(`/api/skill/${skillId}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        reset();
        toast.success("Task added successfully!");
        router.refresh();
      } else {
        const message = onSubmitErrorMessage(response);
        toast.error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("internal server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-foreground border border-gray rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-3">
            <FormField label="" error={errors.name?.message}>
              <FormInput
                type="text"
                placeholder="Enter task name..."
                error={!!errors.name}
                {...register("name")}
              />
            </FormField>
          </div>

          <div className="flex-1">
            <FormField label="" error={errors.dueDate?.message}>
              <FormInput
                type="text"
                placeholder="MM/DD/YYYY"
                error={!!errors.dueDate}
                {...register("dueDate")}
              />
            </FormField>
          </div>

          <Button
            className="w-1/2 flex-1"
            type="submit"
            disabled={isSubmitting}
            size="small"
          >
            {isSubmitting ? <span>Adding...</span> : <span>Add</span>}
          </Button>
        </div>
      </form>
    </div>
  );
}
