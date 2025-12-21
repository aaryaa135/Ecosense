import { Card } from "@/components/ui/card"
import { Gauge, Bell, Lightbulb, Activity, Wifi, Battery, Cpu, Database, Zap } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Gauge,
      title: "Real-Time Monitoring",
      description:
        "Continuous CO₂ level tracking with instant updates to keep you informed about your air quality at all times.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive immediate notifications when CO₂ levels exceed safe thresholds, ensuring prompt action.",
    },
    {
      icon: Lightbulb,
      title: "Actionable Solutions",
      description: "Get personalized recommendations on how to improve air quality based on current readings.",
    },
    {
      icon: Activity,
      title: "Advanced Sensors",
      description: "High-precision NDIR sensors provide accurate readings within ±30 ppm for reliable monitoring.",
    },
    {
      icon: Wifi,
      title: "IoT Connected",
      description: "Seamlessly connects to your smart home ecosystem via WiFi for remote monitoring and control.",
    },
    {
      icon: Battery,
      title: "Long Battery Life",
      description: "Up to 12 months of continuous operation on a single charge with low-power design.",
    },
    {
      icon: Cpu,
      title: "Edge AI Processing",
      description:
        "On-device machine learning algorithms analyze patterns and predict air quality trends in real-time.",
    },
    {
      icon: Database,
      title: "Cloud Analytics",
      description: "Historical data storage and analytics provide insights into long-term air quality patterns.",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Lightning-fast data synchronization across all your devices with sub-second latency.",
    },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">About ECOSENSE</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
            ECOSENSE is an innovative IoT device designed to protect your health by monitoring indoor air quality. Using
            advanced sensors and machine learning, it detects elevated CO₂ levels that can cause fatigue, headaches, and
            reduced cognitive function. Our device doesn&apos;t just alert you—it provides intelligent recommendations
            to improve ventilation and air quality in your space.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Key Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow bg-card">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0">
                      <h4 className="font-semibold text-base sm:text-lg text-card-foreground">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-base sm:text-lg">Sense</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Advanced NDIR sensors continuously measure CO₂ concentration with laboratory-grade precision every 2
                seconds.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-base sm:text-lg">Process</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Edge AI algorithms process data locally, identifying patterns and anomalies in real-time without cloud
                dependency.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-base sm:text-lg">Analyze</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Machine learning models compare readings against health standards and historical data to assess air
                quality trends.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                4
              </div>
              <h4 className="font-semibold text-base sm:text-lg">Alert</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Intelligent push notifications alert you instantly when thresholds are exceeded, with priority levels
                based on severity.
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                5
              </div>
              <h4 className="font-semibold text-base sm:text-lg">Optimize</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Receive personalized recommendations via the mobile app to optimize ventilation and improve air quality
                automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
