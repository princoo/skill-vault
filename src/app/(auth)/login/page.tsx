import LoginForm from "@/components/LoginForm";
import { FaBookOpen } from "react-icons/fa";

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  );
}
