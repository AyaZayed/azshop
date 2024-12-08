import Image from "next/image";
import React from "react";

export default function Encouragements() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center p-4 py-20 gap-10">
      <div className="flex flex-col items-center">
        <Image src="/spiral.avif" alt="spiral" width={50} height={50} />
        <h3 className="font-bold mt-8 capitalize">Free Beauty Pouch</h3>
        <p>with every order</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/star.png" alt="sea star" width={50} height={50} />
        <h3 className="font-bold mt-8 capitalize">Free Shipping</h3>
        <p>
          on all orders above €<span className="font-dashFont">50</span>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/boat.png" alt="boat" width={50} height={50} />
        <h3 className="font-bold mt-8 capitalize">Fast Delivery</h3>
        <p>
          orders dispatched within <span className="font-dashFont">1</span>{" "}
          business day
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/seahorses.webp" alt="seahorses" width={50} height={50} />
        <h3 className="font-bold mt-8 capitalize">
          Give €<span className="font-dashFont">10</span>, Earn €
          <span className="font-dashFont">10</span>
        </h3>
        <p>with every friend your refer</p>
      </div>
    </section>
  );
}
