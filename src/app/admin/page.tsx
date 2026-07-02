"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingCart,
  HiOutlineEnvelope,
  HiOutlinePackage,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineCheck,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  orderId: string;
  customerInfo: { name: string; email: string };
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

type TabType = "dashboard" | "products" | "orders" | "contacts";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authorization
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  // Fetch data
  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrders();
      fetchContacts();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    orderStatus: string,
    paymentStatus: string
  ) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus, paymentStatus }),
      });

      if (res.ok) {
        fetchOrders();
        setSelectedOrder(null);
        toast.success("Order updated!");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    }
  };

  const markContactAsRead = async (contactId: string) => {
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, isRead: true }),
      });

      if (res.ok) {
        fetchContacts();
        setSelectedContact(null);
        toast.success("Contact marked as read!");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact");
    }
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-surface/80 backdrop-blur">
        <div className="container-custom px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <span className="text-sm text-white/60">Welcome, {user.name}</span>
          </div>
        </div>
      </div>

      <div className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: HiOutlineShoppingCart,
                label: "Total Orders",
                value: orders.length,
              },
              {
                icon: HiOutlineEnvelope,
                label: "Messages",
                value: contacts.filter((c) => !c.isRead).length,
              },
              {
                icon: HiOutlinePackage,
                label: "Pending Orders",
                value: orders.filter((o) => o.orderStatus === "pending").length,
              },
              {
                icon: HiOutlineCheck,
                label: "Completed",
                value: orders.filter((o) => o.orderStatus === "completed")
                  .length,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl border border-white/5 bg-surface"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/5 mb-6">
            {(
              [
                { id: "dashboard", label: "Dashboard" },
                { id: "orders", label: "Orders" },
                { id: "contacts", label: "Messages" },
              ] as { id: TabType; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeTab === "orders" ? (
            // Orders Table
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-white/60">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 text-white/60">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 text-white/60">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-white/60">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-white/60">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-3 px-4 text-white">
                          {order.orderId}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {order.customerInfo.name}
                        </td>
                        <td className="py-3 px-4 text-white font-semibold">
                          ₹{order.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.orderStatus === "completed"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-primary hover:text-primary-light transition-colors"
                            aria-label="View order details"
                          >
                            <HiOutlineEye className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "contacts" ? (
            // Contacts/Messages
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      contact.isRead
                        ? "border-white/5 bg-surface"
                        : "border-primary/30 bg-primary/5"
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">
                            {contact.name}
                          </h3>
                          {!contact.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-sm text-white/60">{contact.email}</p>
                        <p className="text-sm text-white/40 mt-2 line-clamp-2">
                          {contact.message}
                        </p>
                      </div>
                      <span className="text-xs text-white/40 flex-shrink-0">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // Dashboard Overview
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl border border-white/5 bg-surface"
              >
                <h3 className="font-bold text-white mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {order.customerInfo.name}
                        </p>
                        <p className="text-xs text-white/40">
                          {order.orderId}
                        </p>
                      </div>
                      <p className="text-white font-semibold">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-surface"
              >
                <h3 className="font-bold text-white mb-4">
                  Unread Messages
                </h3>
                <div className="space-y-3">
                  {contacts
                    .filter((c) => !c.isRead)
                    .slice(0, 5)
                    .map((contact) => (
                      <div key={contact._id}>
                        <p className="text-white font-medium">
                          {contact.name}
                        </p>
                        <p className="text-xs text-white/40 line-clamp-1">
                          {contact.message}
                        </p>
                      </div>
                    ))}
                  {contacts.filter((c) => !c.isRead).length === 0 && (
                    <p className="text-white/40 text-sm">No unread messages</p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl border border-white/5 max-w-2xl w-full max-h-screen overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Order {selectedOrder.orderId}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/60 hover:text-white"
                aria-label="Close"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-white/60 text-sm mb-1">Customer</p>
                  <p className="text-white font-semibold">
                    {selectedOrder.customerInfo.name}
                  </p>
                  <p className="text-white/40 text-sm">
                    {selectedOrder.customerInfo.email}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-white/60 text-sm mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{selectedOrder.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Update Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["pending", "processing", "completed", "cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateOrderStatus(
                            selectedOrder._id,
                            status,
                            status === "completed" ? "paid" : "pending"
                          )
                        }
                        className={`py-2 px-4 rounded-lg font-medium transition-all ${
                          selectedOrder.orderStatus === status
                            ? "bg-primary text-black"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl border border-white/5 max-w-2xl w-full max-h-screen overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedContact.subject}
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-white/60 hover:text-white"
                aria-label="Close"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">From</p>
                  <p className="text-white font-semibold">
                    {selectedContact.name}
                  </p>
                  <p className="text-white/40">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Message</p>
                  <p className="text-white whitespace-pre-wrap mt-2">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {!selectedContact.isRead && (
                  <button
                    onClick={() =>
                      markContactAsRead(selectedContact._id)
                    }
                    className="flex-1 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => setSelectedContact(null)}
                  className="flex-1 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
