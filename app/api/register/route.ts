import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${API_URL}/api/register`, body);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
