import { cookies } from "next/headers";

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const browserCookies = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: browserCookies.toString(),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }

  return res.json();
}
