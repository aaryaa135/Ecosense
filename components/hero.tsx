"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,190,180,0.15),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 animate-fade-in-up backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">AI-Powered Air Quality Monitoring</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance animate-fade-in-up animation-delay-100">
          Breathe Better with <span className="text-primary">ECOSENSE</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance animate-fade-in-up animation-delay-200 px-4">
          {
            "Advanced IoT device that monitors CO₂ levels in real-time, alerts you to air quality issues, and provides actionable solutions for a healthier environment."
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in-up animation-delay-300 px-4">
          <Link href="/order">
            <Button
              size="lg"
              className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Get Yours Now
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 bg-transparent hover:bg-secondary/50 transition-all w-full sm:w-auto"
            onClick={scrollToAbout}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-12 sm:pt-16 max-w-4xl mx-auto animate-fade-in-up animation-delay-400 px-4">
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">99.9%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Monitoring</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{"<"}5s</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">10K+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  )
}
