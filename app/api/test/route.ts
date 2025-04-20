// app/api/test/route.ts
export async function POST() {
  console.log("✅ test route hit");
  return new Response("hello from test POST route");
}
