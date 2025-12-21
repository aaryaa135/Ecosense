"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  name: string
}

interface Order {
  id: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  quantity: number
  total: number
  monitoringUrl: string
}

interface AuthContextType {
  user: User | null
  orders: Order[]
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
  addOrder: (order: Omit<Order, "id" | "date" | "time" | "monitoringUrl">) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  // Load user and orders from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("ecosense_user")
    const savedOrders = localStorage.getItem("ecosense_orders")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate authentication - check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("ecosense_users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name }
      setUser(userData)
      localStorage.setItem("ecosense_user", JSON.stringify(userData))

      // Load user's orders
      const allOrders = JSON.parse(localStorage.getItem("ecosense_all_orders") || "[]")
      const userOrders = allOrders.filter((o: any) => o.userEmail === email)
      setOrders(userOrders)
      localStorage.setItem("ecosense_orders", JSON.stringify(userOrders))

      return true
    }
    return false
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("ecosense_users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser) {
      return false
    }

    // Create new user
    const newUser = { email, password, name }
    users.push(newUser)
    localStorage.setItem("ecosense_users", JSON.stringify(users))

    const userData = { email, name }
    setUser(userData)
    localStorage.setItem("ecosense_user", JSON.stringify(userData))
    setOrders([])

    return true
  }

  const signOut = () => {
    setUser(null)
    setOrders([])
    localStorage.removeItem("ecosense_user")
    localStorage.removeItem("ecosense_orders")
  }

  const addOrder = (orderData: Omit<Order, "id" | "date" | "time" | "monitoringUrl">) => {
    if (!user) return

    const now = new Date()
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      monitoringUrl: "https://monitoring.ecosense.io/dashboard", // Sample URL
    }

    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem("ecosense_orders", JSON.stringify(updatedOrders))

    // Save to all orders with user email
    const allOrders = JSON.parse(localStorage.getItem("ecosense_all_orders") || "[]")
    allOrders.push({ ...newOrder, userEmail: user.email })
    localStorage.setItem("ecosense_all_orders", JSON.stringify(allOrders))
  }

  return (
    <AuthContext.Provider value={{ user, orders, signIn, signUp, signOut, addOrder }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
