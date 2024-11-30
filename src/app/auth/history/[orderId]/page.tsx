"use client";

import OrderHistory from "@/components/ServiceOrder/orderHistory";

interface HistoryParams {
  orderId: string;
}

export default function OrderHistoryPage(params: HistoryParams) {
  const { orderId } = params;

  return <OrderHistory orderId={orderId} />;
}
