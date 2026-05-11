export const services = [
  {
    name: "SearXNG",
    description: "Public privacy-focused search instance",
    url: "https://search-public.hexcode.au/",
    stack: ["Docker", "Caddy", "Valkey", "Debian"],
  },
  {
    name: "Forgejo",
    description: "Self-hosted Git server",
    url: "https://git.hexcode.au",
    stack: ["Docker", "Caddy", "SSH", "Debian"],
  },
];