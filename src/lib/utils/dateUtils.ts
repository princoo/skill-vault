// lib/dateUtils.ts
import { formatDistanceToNow } from "date-fns";

export function getStartedAgo(date: string | Date): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const distance = formatDistanceToNow(parsedDate, { addSuffix: true });
  return `Started ${distance}`;
}

export function formatDateToISO(dateString: string): string {
  const [month, day, year] = dateString.split("/");

  return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();

}

