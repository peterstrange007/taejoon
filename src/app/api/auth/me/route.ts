import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const payload = await getCurrentUser();
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await connectDB();
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}