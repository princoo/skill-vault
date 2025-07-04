"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBookOpen, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { FormInput } from "@/components/ui/FormInput";
import { FormField } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // setIsLoading(true);
    //   setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* this is the heade div */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue rounded-lg mb-4">
            <FaBookOpen className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SkillVault</h1>
          <p className="text-gray-text">Start your learning journey</p>
        </div>

        <div className="bg-foreground border border-gray rounded-xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Full Name" error={errors.name?.message}>
              <div className="relative">
                <FormInput
                  type="text"
                  placeholder="John Doe"
                  error={!!errors.name}
                  className="pl-12"
                  {...register("name")}
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-text" />
              </div>
            </FormField>

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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-text hover:text-gray-text"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.confirmPassword?.message}
            >
              <div className="relative">
                <FormInput
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  error={!!errors.confirmPassword}
                  className="pr-12"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-text hover:text-gray-text"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </FormField>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-text">
              Already have an account?
              <Link
                href="/login"
                className="text-blue hover:text-blue/80 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
