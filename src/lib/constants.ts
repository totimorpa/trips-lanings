export const SPORTS = [
  { id: "waterpolo", name: "Waterpolo", icon: "🤽" },
  { id: "atletismo", name: "Atletismo", icon: "🏃" },
  { id: "golf", name: "Golf", icon: "⛳" },
  { id: "badminton", name: "Bádminton", icon: "🏸" },
  { id: "futbol-sala", name: "Fútbol Sala", icon: "⚽" },
  { id: "triatlon", name: "Triatlón", icon: "🏊" },
  { id: "balonmano", name: "Balonmano", icon: "🤾" },
  { id: "voleibol", name: "Voleibol", icon: "🏐" },
  { id: "patinaje", name: "Patinaje Sincronizado", icon: "⛸️" },
  { id: "futbol", name: "Fútbol", icon: "⚽" },
  { id: "tenis", name: "Tenis", icon: "🎾" },
  { id: "rugby", name: "Rugby", icon: "🏉" },
  { id: "natacion", name: "Natación", icon: "🏊" },
  { id: "beisbol", name: "BÉISBOL", icon: "⚾" },
  { id: "baloncesto", name: "Baloncesto", icon: "🏀" },
  { id: "hockey-hierba", name: "Hockey Hierba", icon: "🏑" },
  { id: "hockey-patines", name: "Hockey Patines", icon: "🏒" },
] as const;

export type Sport = (typeof SPORTS)[number]["id"];
