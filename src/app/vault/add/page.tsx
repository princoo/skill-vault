"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/FormInput";
import { FormField } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import {
  createSkillSchema,
  type SkillFormData,
} from "@/lib/validations/skillSchema";
import clsx from "clsx";
import { Category } from "@/enum/skill";
import toast from "react-hot-toast";

export default function AddSkillPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(createSkillSchema),
  });

  const onSubmit = async (data: SkillFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        reset(); 
        toast.success("Skill added successfully!");
        router.push("/vault");
      } else {
        if (response.status === 401) {
          setError(
            "You must be logged in to create a skill. Please sign in again."
          );
        } else if (response.status === 400) {
          setError(
            result.error || "Invalid form data. Please check your inputs."
          );
        } else {
          setError(result.error || "Failed to create skill. Please try again.");
        }
      }
    } catch (error) {
      console.error("Network error creating skill:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (

        <main className="p-6 max-w-4xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-white text-lg font-semibold mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Skill Title" error={errors.title?.message}>
                  <FormInput
                    type="text"
                    placeholder="e.g., React Advanced Patterns"
                    error={!!errors.title}
                    {...register("title")}
                  />
                </FormField>

                <FormField label="Category" error={errors.category?.message}>
                  <select
                    className={clsx(
                      "w-full px-4 py-3 border rounded-lg text-sm font-medium bg-slate-800 text-white border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200",
                      errors.category && "border-red-500"
                    )}
                    {...register("category")}
                  >
                    <option value="">Select a category</option>
                    {Object.keys(Category).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="mt-6">
                <FormField
                  label="Description"
                  error={errors.description?.message}
                >
                  <textarea
                    placeholder="Describe what you want to learn and achieve with this skill..."
                    className={clsx(
                      "w-full px-4 py-3 border rounded-lg text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-800 text-white resize-none",
                      errors.description ? "border-red-500" : "border-slate-600"
                    )}
                    rows={4}
                    {...register("description")}
                  />
                </FormField>
              </div>
            </section>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Link
                href="/vault"
                className="px-6 py-3 border border-slate-600 text-gray-300 rounded-lg font-medium hover:bg-slate-700 hover:text-white transition-colors duration-200"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Creating Skill..." : "Create Skill"}
              </Button>
            </div>
          </form>
        </main>
  );
}
