"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EventBookingFormProps {
  event: {
    id: number
    title: string
    price: string
    startDate: string
    endDate: string
    accommodations?: Array<{
      id: number
      name: string
      category: string
      location: string
      prices: {
        standard: string
        premium?: string
      }
    }>
  }
}

export function EventBookingForm({ event }: EventBookingFormProps) {
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: "1",
    accommodation: "",
    roomType: "standard",
    message: "",
  })

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)

    // Set default accommodation if available
    if (event.accommodations && event.accommodations.length > 0) {
      setFormData((prev) => ({
        ...prev,
        accommodation: event.accommodations![0].id.toString(),
      }))
    }
  }, [event.accommodations])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // In a real app, this would submit the form data to an API
      alert("¡Gracias por tu solicitud! Te contactaremos pronto para confirmar tu reserva.")
      setStep(3)
    }
  }

  const getSelectedAccommodation = () => {
    if (!event.accommodations || !formData.accommodation) return null
    return event.accommodations.find((a) => a.id.toString() === formData.accommodation)
  }

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return null
  }

  const selectedAccommodation = getSelectedAccommodation()

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {step === 3 ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#021925]">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu interés en nuestro viaje al {event.title}. Nuestro equipo te contactará pronto para confirmar
            los detalles.
          </p>
          <Button className="w-full bg-[#021925] hover:bg-[#021925]/90 text-white" onClick={() => setStep(1)}>
            Solicitar otro viaje
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#021925]">Reserva tu viaje</h2>
            <p className="text-gray-600">
              Completa el formulario para solicitar información y reservar tu plaza para este evento.
            </p>
          </div>

          <div className="bg-[#F06F51]/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#021925]">{event.title}</h3>
              <span className="text-[#F06F51] font-bold">{event.price}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Calendar className="h-4 w-4 mr-2" />
              {event.startDate} - {event.endDate}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                <div className="space-y-4 mb-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre y apellidos"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="participants">Número de participantes</Label>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <Select
                        value={formData.participants}
                        onValueChange={(value) => handleSelectChange("participants", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 persona</SelectItem>
                          <SelectItem value="2">2 personas</SelectItem>
                          <SelectItem value="3">3 personas</SelectItem>
                          <SelectItem value="4">4 personas</SelectItem>
                          <SelectItem value="5+">5 o más personas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Accommodation Selection */}
                  {event.accommodations && event.accommodations.length > 0 && (
                    <div className="grid gap-2">
                      <Label>Selecciona alojamiento</Label>
                      <div className="space-y-3">
                        <RadioGroup
                          value={formData.accommodation}
                          onValueChange={(value) => handleSelectChange("accommodation", value)}
                        >
                          {event.accommodations.map((accommodation) => (
                            <div
                              key={accommodation.id}
                              className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50"
                            >
                              <RadioGroupItem
                                value={accommodation.id.toString()}
                                id={`accommodation-${accommodation.id}`}
                              />
                              <Label htmlFor={`accommodation-${accommodation.id}`} className="flex-1 cursor-pointer">
                                <div className="font-medium">{accommodation.name}</div>
                                <div className="text-sm text-gray-600">
                                  {accommodation.location} • {accommodation.category}
                                </div>
                              </Label>
                              <div className="text-right">
                                <div className="text-sm font-medium text-[#F06F51]">
                                  {accommodation.prices.standard}
                                </div>
                                {accommodation.prices.premium && (
                                  <div className="text-xs text-gray-600">Premium: {accommodation.prices.premium}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {/* Room Type Selection */}
                  {selectedAccommodation && selectedAccommodation.prices.premium && (
                    <div className="grid gap-2">
                      <Label>Tipo de habitación</Label>
                      <RadioGroup
                        value={formData.roomType}
                        onValueChange={(value) => handleSelectChange("roomType", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="room-standard" />
                          <Label htmlFor="room-standard" className="cursor-pointer">
                            Estándar ({selectedAccommodation.prices.standard})
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="room-premium" />
                          <Label htmlFor="room-premium" className="cursor-pointer">
                            Premium ({selectedAccommodation.prices.premium})
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-[#F06F51] hover:bg-[#F06F51]/90 text-white">
                  Continuar
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="grid gap-2">
                    <Label htmlFor="message">Mensaje (opcional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntanos tus preferencias o preguntas específicas..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-[#021925] mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Información de pago
                    </h4>
                    <p className="text-sm text-gray-600">
                      No se requiere pago ahora. Nuestro equipo te contactará para confirmar disponibilidad y opciones
                      de pago.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Atrás
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#F06F51] hover:bg-[#F06F51]/90 text-white">
                    Solicitar reserva
                  </Button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#F06F51] mt-0.5 mr-2" />
              <p className="text-sm text-gray-600">
                Sin compromiso: solicita información y nuestro equipo te contactará para resolver todas tus dudas antes
                de confirmar.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

