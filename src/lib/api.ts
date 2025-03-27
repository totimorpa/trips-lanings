import { supabase } from "./supabase";
import type { Event, EventService } from "@/types";

export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data as Event[];
}

export async function getEventServices(eventId: string) {
  const { data, error } = await supabase
    .from("event_services")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching event services:", error);
    return [];
  }

  return data as EventService[];
}
