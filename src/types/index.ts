import { Sport } from "@/lib/constants";

export interface Event {
  id: string;
  title: string;
  sport: Sport;
  image: string;
  start_date: string;
  end_date: string;
  location: string;
  description_es: string;
  description_en: string;
  vide_url?: string;
  image_2?: string;
  competition_id?: string;
  cms_id?: string;
  city?: string;
  address?: string;
  coordinates?: string;
}

export interface EventService {
  id: string;
  created_at: string;
  event_id: string;
  type: "accommodation" | "transport" | "tour" | "other";
  image?: string;
  title: string;
  description_es: string;
  description_en: string;
  price_text?: string;
}

export interface EventRegistration {
  registerSport: string;
  registerClubName: string;
  registerUserName: string;
  registerUserEmail: string;
  registerUserPhone: string;
  eventName: string;
  eventCity: string;
  eventAddress: string;
  eventCoordinates: string;
  startDate: string;
  endDate: string;
  competitionId?: string;
}
