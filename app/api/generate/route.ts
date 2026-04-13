import generatePredictions from "@/lib/generator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = generatePredictions(body);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}