import * as skillService from "../services/skillService";
import { NextResponse } from "next/server";
import { createSkillSchema } from "../validations/skillSchema";
import { currentUser } from "../auth";
import { Status } from "@/enum/skill";
import { errorResponse, jsonResponse } from "../utils/response";

export async function create(request: Request) {
  const body = await request.json();
  const parsed = createSkillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  const user = await currentUser();
  if (!user || !user.id) {
    return NextResponse.json(
      { error: "Unauthorized", user: { message: "User not found" } },
      { status: 401 }
    );
  }
  const data = {
    ...parsed.data,
    status: Status.NOT_STARTED,
    userId: user.id,
  };
  const skill = await skillService.createSkill(data);
  return NextResponse.json(
    { success: true, message: "Skill created successfully", data: skill },
    { status: 201 }
  );
}

export async function getAllByUser() {
  const user = await currentUser();
  console.log("the user is ", user);
  if (!user || !user.id) {
    return NextResponse.json(
      { error: "Unauthorized", user: { message: "User not found" } },
      { status: 401 }
    );
  }
  const skills = await skillService.getSkillsByUserId(user.id);
  return NextResponse.json({
    success: true,
    message: "User skills retrieved successfully",
    data: skills,
  });
}
export async function getById(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params
  const user = await currentUser();
  if (!user || !user.id) {
    return errorResponse("Unauthorized", 401, { message: "User not found" });
  }
  const skill = await skillService.getSkillById(id);
  if (!skill) {
    return errorResponse("Skill not found", 404);
  }
  return jsonResponse(skill, { message: "Skill retrieved successfully" });
}
export async function remove(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await currentUser();
  if (!user || !user.id) {
    return errorResponse("Unauthorized", 401, { message: "User not found" });
  }
  const { id } = await params;
  const skill = await skillService.getSkillById(id);
  if (!skill) {
    return errorResponse("Skill not found", 404);
  }
  const deleted = await skillService.removeSkill(id);
  return jsonResponse(deleted, { message: "Skill deleted successfully" });
}
