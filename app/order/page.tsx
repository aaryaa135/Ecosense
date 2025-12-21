"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderHistory } from "@/components/order-history"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Wind } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function OrderPage() {
  const { user, addOrder } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    quantity: 1,
    paymentMethod: "credit_card",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const pricePerUnit = 149
  const totalPrice = pricePerUnit * formData.quantity

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth")
      return
    }

    addOrder({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      quantity: formData.quantity,
      total: totalPrice,
    })

    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <Card className="max-w-2xl w-full p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Thank you for your order, {formData.name}! We've received your request and will process it shortly.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              You will receive a confirmation email at <span className="font-medium break-words">{formData.email}</span>{" "}
              with tracking details once your order ships.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  Return to Home
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => setOrderPlaced(false)} className="w-full sm:w-auto">
                View Order History
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Order Your ECOSENSE</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {user ? `Welcome back, ${user.name}!` : "Sign in to track your orders"}
            </p>
          </div>

          {user && (
            <div className="mb-8 sm:mb-12">
              <OrderHistory />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Order Form */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Shipping Address *
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main St, City, State, ZIP"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Payment Method *</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="credit_card"
                        checked={formData.paymentMethod === "credit_card"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span>PayPal</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={formData.paymentMethod === "bank_transfer"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {user ? `Place Order - $${totalPrice}` : "Sign In to Place Order"}
                </Button>
              </form>
            </Card>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Wind className="h-10 w-10 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">ECOSENSE Device</h3>
                      <p className="text-sm text-muted-foreground">Smart CO₂ Monitor</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per unit</span>
                      <span className="font-medium">${pricePerUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-primary">Free</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  What's Included
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    ECOSENSE Device
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    USB-C Charging Cable
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Quick Start Guide
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Mobile App Access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    2-Year Warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    Free Shipping
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
