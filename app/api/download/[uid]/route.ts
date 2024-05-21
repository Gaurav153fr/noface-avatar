import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  // Send the buffer in the response
  return NextResponse.json({ message: params.uid });
}
