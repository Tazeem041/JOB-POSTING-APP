import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const token = request.headers.get("Authorization");

  try {
    const response = await axios.get(
      `${API_URL}/api/jobs${search ? `?search=${search}` : ""}`,
      {
        headers: { Authorization: token },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization");
  const body = await request.json();

  try {
    const response = await axios.post(`${API_URL}/api/jobs`, body, {
      headers: { Authorization: token },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      { error: "An error occurred while posting the job" },
      { status: 500 }
    );
  }
}
