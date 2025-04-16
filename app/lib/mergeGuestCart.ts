import { redis } from "./redis";

export default async function mergeGuestCart(userId: string, guestId: string) {
  try {
    const guestKey = `cart-${guestId}`;
    const userKey = `cart-${userId}`;

    const rawGuestCart = await redis.hgetall(guestKey);
    const rawUserCart = await redis.hgetall(userKey);

    const guestCart: Record<string, string> =
      rawGuestCart && typeof rawGuestCart === "object" ? rawGuestCart : {};

    const userCart: Record<string, string> =
      rawUserCart && typeof rawUserCart === "object" ? rawUserCart : {};

    console.log("guestCart:", guestCart);
    console.log("userCart:", userCart);

    for (const [productId, quantity] of Object.entries(guestCart)) {
      const current = parseInt(userCart[productId] || "0", 10);
      const totalQty = current + parseInt(quantity, 10);
      await redis.hset(userKey, { [productId]: totalQty.toString() });
    }

    await redis.del(guestKey);
  } catch (err) {
    console.error("Error merging carts:", err);
  }
}
