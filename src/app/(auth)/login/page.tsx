"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBookOpen, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { FormInput } from "@/components/ui/FormInput";
import { FormField } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // setIsLoading(true);
    //   setIsLoading(false);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* this is the header div */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue rounded-lg mb-4">
            <FaBookOpen className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SkillVault</h1>
          <p className="text-slate-400">Track your learning journey</p>
        </div>

        {/* the form wrapper */}
        <div className="bg-foreground border border-slate-600 rounded-xl p-6">
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
      </div>
    </div>
  );
}
