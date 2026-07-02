import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Admin contacts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id, isRead } = await req.json();

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );

    if (!contact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Contact updated", contact });
  } catch (error) {
    console.error("Admin contact update error:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}