import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Admin products fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const product = await Product.create({
      ...body,
      slug: body.slug || slugify(body.name),
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin product create error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}