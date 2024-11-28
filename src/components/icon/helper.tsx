export function get_avatar_url(id: string | null) {
  if (id == null) return "https://i.pravatar.cc/300";
  return `https://i.pravatar.cc/300?u=${id}`;
}
