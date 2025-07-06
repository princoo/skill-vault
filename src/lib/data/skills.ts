/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skill } from "@/types/skills";
// import { apiFetch } from "@/app/api";
import { cookies } from "next/headers";

export async function getUserSkills(): Promise<{ data: Skill[] }> {
  const browserCookies = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/skill`, {
    headers: {
      Cookie: browserCookies.toString(),
    },
  });
  return res.json();
}

export async function getSkillById(id: string): Promise<{ data: Skill }> {
    const browserCookies = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/skill/${id}`, {
    headers: {
      Cookie: browserCookies.toString(),
    },
  });
  return res.json();
  // return apiFetch(`/skill/${id}`);
}
export async function removeSkill(id: string): Promise<any> {
    // const browserCookies = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/skill/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
