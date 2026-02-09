const requests = new Map<string, number[]>();

export function rateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const timestamps = requests.get(key) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  requests.set(key, recent);
  return recent.length <= limit;
}
