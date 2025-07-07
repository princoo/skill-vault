"use client";
import React, { useState } from "react";
import { FormField } from "./ui/FormField";
import { FormInput } from "./ui/FormInput";
import { Checkbox } from "./ui/CheckBox";
import Button from "./ui/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { doCredentialLogin } from "@/actions/login";
import { useRouter } from "next/navigation";
import ErrorDiv from "./ErrorDiv";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await doCredentialLogin(data);

      if (response.success) {
        router.push("/vault");
      } else {
        setError(response.error);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-foreground border border-slate-600 rounded-xl p-6">
      {isError && <ErrorDiv error={isError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Email" error={errors.email?.message}>
          <FormInput
            type="email"
            placeholder="your@email.com"
            error={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <div className="relative">
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={!!errors.password}
              className="pr-12"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-text/50 hover:text-gray-text"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <label htmlFor="rememberMe" className="text-sm text-gray-text">
            Remember me
          </label>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-text">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-blue hover:text-blue/80 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
