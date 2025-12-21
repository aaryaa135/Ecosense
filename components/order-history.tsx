"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Package } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function OrderHistory() {
  const { orders } = useAuth()

  if (orders.length === 0) {
    return (
      <Card className="p-6 sm:p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
        <p className="text-sm text-muted-foreground">
          Your order history will appear here once you place your first order.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">Order History</h2>
      {orders.map((order) => (
        <Card key={order.id} className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b">
            <div>
              <h3 className="font-semibold text-lg">Order {order.id}</h3>
              <p className="text-sm text-muted-foreground">
                {order.date} at {order.time}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold text-lg text-primary">${order.total}</p>
              <p className="text-sm text-muted-foreground">{order.quantity} unit(s)</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{order.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{order.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium break-words">{order.email}</p>
            </div>
          </div>

          <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
            <a href={order.monitoringUrl} target="_blank" rel="noopener noreferrer">
              View Monitoring Dashboard
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
      ))}
    </div>
  )
}
