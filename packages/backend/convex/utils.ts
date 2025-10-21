const defaultOrigin = "http://app.test.com:5190";
const allowedOrigins = new Set(
  [
    process.env.CONVEX_SITE_URL,
    "http://test.com:5170",
    "http://forum.test.com:5180",
    defaultOrigin,
  ].filter(
    (value): value is string => typeof value === "string" && value.length > 0
  )
);

export const buildCorsHeaders = (request: Request) => {
  const origin = request.headers.get("Origin");
  const allowOrigin =
    origin && allowedOrigins.has(origin) ? origin : defaultOrigin;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  } satisfies Record<string, string>;
};
const length_limit = 100;
export function hasDelimiter(response: string) {
  return (
    response.includes("\n") ||
    response.includes(".") ||
    response.includes("?") ||
    response.includes("!") ||
    response.includes(",") ||
    response.length > length_limit
  );
}
