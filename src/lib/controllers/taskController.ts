import * as taskService from "../services/taskService";
import { currentUser } from "../auth";
import { errorResponse, jsonResponse } from "../utils/response";
import { Task } from "@/types/skills";

export async function create(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body:Task = await request.json();
//   const parsed = taskSchema.safeParse(body);
//   if (!parsed.success) {
//     return NextResponse.json(
//       { error: "Invalid request body" },
//       { status: 400 }
//     );
//   }
  const user = await currentUser();
  if (!user || !user.id) {
    return errorResponse("Unauthorized", 401, { message: "User not found" });
  }
  const data = {
    ...body,
    skillId: id,
  };
  const task = await taskService.createTask(data);
  return jsonResponse(task, {
    message: "Tak created successfully",
    status: 201,
  });
}

// export async function remove(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const user = await currentUser();
//   if (!user || !user.id) {
//     return errorResponse("Unauthorized", 401, { message: "User not found" });
//   }
//   const { id } = await params;
//   const skill = await skillService.getSkillById(id);
//   if (!skill) {
//     return errorResponse("Skill not found", 404);
//   }
//   const deleted = await skillService.removeSkill(id);
//   return jsonResponse(deleted, { message: "Skill deleted successfully" });
// }
