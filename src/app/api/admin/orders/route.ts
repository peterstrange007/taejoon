import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .lean();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
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
    const { orderId, orderStatus, paymentStatus } = await req.json();

    const order = await Order.findOneAndUpdate(
      { orderId },
      { ...(orderStatus && { orderStatus }), ...(paymentStatus && { paymentStatus }) },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated", order });
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}