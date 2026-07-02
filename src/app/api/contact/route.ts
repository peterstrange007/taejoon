import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}