import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import { generateOrderId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const payload = await getCurrentUser();
    const body = await req.json();

    const orderId = generateOrderId();

    const order = await Order.create({
      orderId,
      user: payload?.userId || undefined,
      customerInfo: body.customerInfo,
      items: body.items,
      tier: body.tier || "student",
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod || "razorpay",
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    return NextResponse.json(
      { message: "Order created", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const payload = await getCurrentUser();
    if (!payload) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectDB();
    const orders = await Order.find({ user: payload.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}