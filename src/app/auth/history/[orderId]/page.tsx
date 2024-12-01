"use client";

import OrderHistory from "@/components/ServiceOrder/orderHistory";
import { useParams } from "next/navigation";

export default function OrderHistoryPage() {
  const { orderId } = useParams()

  return <OrderHistory orderId={String(orderId)} />;
}
