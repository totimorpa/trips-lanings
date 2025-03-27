import Image from "next/image"
import { Star } from "lucide-react"

interface AccommodationOption {
  id: number
  name: string
  category: string
  location: string
  image: string
  prices: {
    standard: string
    premium?: string
  }
}

interface AccommodationCardProps {
  accommodation: AccommodationOption
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const renderStars = (category: string) => {
    const stars = category.includes("5") ? 5 : category.includes("4") ? 4 : category.includes("3") ? 3 : 2

    return (
      <div className="flex items-center">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-[#F06F51] text-[#F06F51]" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex">
        {/* Image */}
        <div className="relative w-1/3 h-32">
          <Image
            src={accommodation.image || "/placeholder.svg"}
            alt={accommodation.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-[#021925]">{accommodation.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{accommodation.location}</p>
              {renderStars(accommodation.category)}
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-[#F06F51]">{accommodation.prices.standard}</div>
              {accommodation.prices.premium && (
                <div className="text-sm text-gray-700">{accommodation.prices.premium}</div>
              )}
              <div className="text-xs text-gray-500">por persona/noche</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

