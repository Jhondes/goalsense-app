import { NextResponse } from "next/server";
import { generatePredictions } from "@/lib/generatorLogic";

export async function POST(req: Request) {
  const filters = await req.json();
  const data = generatePredictions(filters);

  return NextResponse.json(data);
}
