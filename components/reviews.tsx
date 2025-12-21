import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Reviews() {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Home Office User",
      initials: "SJ",
      rating: 5,
      text: "ECOSENSE has been a game-changer for my home office. I used to get headaches in the afternoon, but now I get alerts when CO₂ levels are high and can open windows. My productivity has increased significantly!",
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      initials: "MC",
      rating: 5,
      text: "We installed ECOSENSE devices in our café and the difference is remarkable. Customers comment on how fresh the air feels, and we've optimized our HVAC system based on the data. Highly recommend!",
    },
    {
      name: "Emily Rodriguez",
      role: "Parent & Teacher",
      initials: "ER",
      rating: 5,
      text: "As a parent, I wanted to ensure my kids have the best air quality while studying. ECOSENSE gives me peace of mind with real-time monitoring and easy-to-understand alerts. The app is intuitive and helpful.",
    },
    {
      name: "David Park",
      role: "Fitness Studio Manager",
      initials: "DP",
      rating: 5,
      text: "In a gym environment, air quality is critical. ECOSENSE helps us maintain optimal ventilation during peak hours. The smart recommendations have helped us create a healthier workout space for our members.",
    },
    {
      name: "Lisa Thompson",
      role: "Apartment Resident",
      initials: "LT",
      rating: 5,
      text: "Living in a small apartment, I wasn't aware of air quality issues until I got ECOSENSE. It's stylish, unobtrusive, and the battery life is incredible. The insights have changed how I manage my living space.",
    },
    {
      name: "James Wilson",
      role: "Tech Enthusiast",
      initials: "JW",
      rating: 5,
      text: "The IoT integration is seamless! ECOSENSE works perfectly with my smart home setup. The data accuracy is impressive, and I love the historical tracking feature. This is the future of healthy living.",
    },
  ]

  return (
    <section id="reviews" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Join thousands of satisfied customers who have improved their indoor air quality with ECOSENSE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{review.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
