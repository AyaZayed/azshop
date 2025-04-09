import ProductCarousel from "@/app/components/storefront/ProductCarousel";
import ReviewsStars from "@/app/components/storefront/ReviewsStars";
import prisma from "@/app/lib/db";
import { currency } from "@/utils/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Encouragements from "@/app/components/storefront/Encouragements";
import ReviewsSection from "@/app/components/storefront/ReviewsSection";
import Quantity from "@/app/components/storefront/Quantity";
import { addItemToCart } from "@/app/actions";
import { AddToCartButton } from "@/app/components/SubmitButtons";
import { unstable_noStore } from "next/cache";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  unstable_noStore();
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) return notFound();
  const addItem = addItemToCart.bind(null, product.id);

  return (
    <div className="font-secondary pb-80 md:pb-0">
      <section className="z-1 w-full h-full grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-full relative">
          <ProductCarousel
            category={product.category}
            images={product.images}
          />
        </div>
        <div className="p-6 py-16 md:p-24 md:pt-36 flex flex-col gap-4 items-center text-center">
          <h1 className="text-4xl md:text-6xl uppercase font-bold mb-5">
            {product.name}
          </h1>
          <p className="font-primary">{product.description}</p>
          <h3>
            {currency}
            {product.price}
          </h3>
          {product.reviewsCount > 0 && (
            <Link
              href="#reviews"
              className="reviews flex gap-2 text-base items-center">
              <ReviewsStars rating={4.3} />
              <span>{product.reviewsCount} Reviews</span>
            </Link>
          )}
          <Quantity />
          <form action={addItem}>
            <AddToCartButton
              label="Add to Cart"
              href="/cart"
              style="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none"
            />
          </form>
        </div>
      </section>
      <section className="p-6 w-full md:w-3/4 mx-auto flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          fill="#a54547"
          stroke="#a54547"
          viewBox="0 0 80 34"
          className="m-4 w-lerub_icon">
          <path
            d="M37.813,2.925c.061-.138.455-1.068,1.077-1.172a2.558,2.558,0,0,1,.508-.016,2.77,2.77,0,0,1,.715.144.929.929,0,0,1,.524.487,4.349,4.349,0,0,0,.487.761,20.1,20.1,0,0,0,1.61,1.778,8.028,8.028,0,0,0,3.494,2.068c.959.274,1.932.505,2.9.734a3.755,3.755,0,0,0,.657.093A13.355,13.355,0,0,0,52.1,7.757a2.173,2.173,0,0,1,.254-.015,12.671,12.671,0,0,0,2.017-.183A21.39,21.39,0,0,0,56.72,7.08a8.2,8.2,0,0,0,2.606-1.219c.5-.362,1.024-.7,1.511-1.084a8.947,8.947,0,0,0,1.872-1.97A12.258,12.258,0,0,0,63.743.886c.045-.1.085-.2.127-.3a.828.828,0,0,1,.574-.5,2.388,2.388,0,0,1,1.543.09,1.455,1.455,0,0,1,.461.337,3.383,3.383,0,0,1,.659.952c.111.236.214.475.324.712a3.75,3.75,0,0,0,.99,1.3A12.339,12.339,0,0,0,70.9,5.109a11.81,11.81,0,0,0,2.123.7,16.962,16.962,0,0,0,1.954.42c.237.036.475.069.714.091a33.523,33.523,0,0,0,3.846.167h0a.346.346,0,0,1,.344.259A4.184,4.184,0,0,1,80,7.284a.349.349,0,0,1-.3.384,2.224,2.224,0,0,1-.323.03c-.635,0-1.27,0-1.9-.024-.47-.018-.938-.078-1.408-.107a15.543,15.543,0,0,1-2.634-.38q-1.094-.26-2.18-.553a12.035,12.035,0,0,1-3.744-1.8A9.512,9.512,0,0,1,65.747,3.34c-.117-.133-.228-.271-.361-.429-.063.085-.11.146-.154.209a11.277,11.277,0,0,1-2.957,2.94c-.257.174-.514.348-.764.531a10.642,10.642,0,0,1-3.781,1.7,28.289,28.289,0,0,1-2.8.518,18.209,18.209,0,0,1-1.96.159c-.489.017-.978.067-1.467.077-.466.01-.933.013-1.4,0A11.24,11.24,0,0,1,48.338,8.8c-1.087-.253-2.175-.506-3.242-.833a11.135,11.135,0,0,1-4.059-2.241c-.363-.314-.679-.683-1.015-1.028a1.606,1.606,0,0,0-.311-.305,16.921,16.921,0,0,1-2.075,2.145A16.591,16.591,0,0,1,33.461,9.2a14.918,14.918,0,0,1-7.675,1.154,19.592,19.592,0,0,1-3.1-.711,21.441,21.441,0,0,1-3.652-1.422,11.158,11.158,0,0,1-2.2-1.53A9.229,9.229,0,0,1,15.4,5.207c-.208-.272-.443-.524-.687-.81a2.406,2.406,0,0,0-.168.195c-.229.338-.452.681-.681,1.019a8.156,8.156,0,0,1-2.742,2.522A34.487,34.487,0,0,1,7.773,9.776a8.881,8.881,0,0,1-2.4.6,24.546,24.546,0,0,1-3.723.049,4.271,4.271,0,0,1-1.4-.266.368.368,0,0,1-.09-.647l.006,0c.093-.059.179-.13.271-.19a1.018,1.018,0,0,1,.894-.152,1.056,1.056,0,0,0,.3.045c.635.012,1.27.025,1.906.026A6.758,6.758,0,0,0,5.768,8.89,7.46,7.46,0,0,0,6.5,8.6c.661-.311,1.317-.63,1.973-.951.21-.1.413-.22.619-.332a7.32,7.32,0,0,0,2.566-2.407A16.89,16.89,0,0,0,12.791,2.9c.061-.123.122-.246.191-.365a.993.993,0,0,1,.65-.475,2.322,2.322,0,0,1,1.5.123,1.716,1.716,0,0,1,.363.228,1.923,1.923,0,0,1,.285.279Q16.8,3.907,17.815,5.128A9.324,9.324,0,0,0,20.577,7.4,14.247,14.247,0,0,0,23.685,8.62a12.9,12.9,0,0,0,4.029.609,10.769,10.769,0,0,0,4.87-1.357c1.966-1.111,4.578-3.465,5.229-4.947"
            transform="translate(0 0.001)"></path>
          <path
            d="M92.925,97.717a9.08,9.08,0,0,1-7.467-4.185,6.361,6.361,0,0,0-.429-.606A1.392,1.392,0,0,0,83.8,92.37a3.725,3.725,0,0,0-1.166.251,9.987,9.987,0,0,0-2.947,1.722,23.555,23.555,0,0,0-1.956,1.838,6.877,6.877,0,0,1-4.138,2.151,7.217,7.217,0,0,1-6.183-2.019A8.766,8.766,0,0,1,66,94.645c-.151-.23-.308-.456-.465-.682a3.522,3.522,0,0,0-1.429-1.156,1.323,1.323,0,0,0-.884-.105,4.355,4.355,0,0,0-1.116.424,5.4,5.4,0,0,0-1.386,1.033q-1.341,1.4-2.692,2.8a6.727,6.727,0,0,1-2.569,1.758,7.53,7.53,0,0,1-3.008.444,5.014,5.014,0,0,1-1.8-.443,6.481,6.481,0,0,1-2.8-2.374c-.308-.471-.578-.967-.859-1.455-.1-.178-.188-.367-.285-.549a6.523,6.523,0,0,0-3.255-2.924,2.8,2.8,0,0,0-2.9.306,4.065,4.065,0,0,0-.331.247c-.747.653-1.5,1.294-2.232,1.969a3.046,3.046,0,0,1-1.514.705,1.28,1.28,0,0,1-.734-.07.628.628,0,0,1-.294-.924,1.49,1.49,0,0,1,.189-.218c.136-.137.272-.274.416-.4.637-.569,1.272-1.14,1.918-1.7a5.252,5.252,0,0,1,2.436-1.25,6.793,6.793,0,0,1,1.065-.132,7.663,7.663,0,0,1,1.569.06,8.393,8.393,0,0,1,2.82,1.02,9.314,9.314,0,0,1,2.49,2.088,7.306,7.306,0,0,1,.645.956c.184.306.334.631.5.948a9.307,9.307,0,0,0,1.075,1.659,4.421,4.421,0,0,0,1.376,1.105,1.337,1.337,0,0,0,.8.146,4.111,4.111,0,0,0,2.322-.983q.476-.428.923-.886c.9-.916,1.763-1.86,2.681-2.753a6.662,6.662,0,0,1,3.359-1.764,5.529,5.529,0,0,1,3.44.369,5.641,5.641,0,0,1,2.573,2.126c.154.244.316.484.484.719a6.884,6.884,0,0,0,1.857,1.8c.15.1.305.187.461.275a2.714,2.714,0,0,0,2.121.227,5.189,5.189,0,0,0,2.36-1.385c.251-.255.484-.529.739-.779a20.993,20.993,0,0,1,2.472-2.065c.1-.072.2-.141.312-.2a11.8,11.8,0,0,1,3.022-1.31,6.789,6.789,0,0,1,1.971-.177,5.617,5.617,0,0,1,1.777.35,3.837,3.837,0,0,1,1.92,1.5c.142.219.292.434.439.65a7.527,7.527,0,0,0,2.771,2.423,3.614,3.614,0,0,0,1.589.4,5.439,5.439,0,0,0,2.6-.561,24.116,24.116,0,0,0,3.434-1.977,17.168,17.168,0,0,1,2.777-1.629,7.446,7.446,0,0,1,2.057-.6,3.293,3.293,0,0,1,1.315.074.852.852,0,0,1,.433.228.2.2,0,0,1-.038.316.607.607,0,0,1-.394.1,2.819,2.819,0,0,0-1.641.475,6.527,6.527,0,0,0-1.26.933,8.132,8.132,0,0,1-1.008.789A22.317,22.317,0,0,1,98.2,96.127c-.663.337-1.33.666-2.008.972a6.128,6.128,0,0,1-1.951.51c-.439.041-.879.072-1.318.108"
            transform="translate(-29.371 -74.788)"></path>
          <path
            d="M47.181,156.706a14.559,14.559,0,0,1,1.977.166,5.967,5.967,0,0,1,2.419,1.012,33.238,33.238,0,0,1,2.885,2.281c.311.271.635.528.967.774a2,2,0,0,0,1.446.356,3.03,3.03,0,0,0,1.662-.663c.332-.268.662-.542.964-.842a7.192,7.192,0,0,1,1.763-1.285,18.661,18.661,0,0,1,2.483-1.12,6.644,6.644,0,0,1,2.526-.34,8.637,8.637,0,0,1,4.158,1.354c.539.333,1.067.685,1.618,1,.418.237.858.438,1.3.635a4.185,4.185,0,0,0,1.567.337,8.606,8.606,0,0,0,2.83-.258,6.659,6.659,0,0,0,.74-.26c1.175-.51,2.349-1.021,3.516-1.548.451-.2.891-.438,1.321-.682a12.66,12.66,0,0,1,3.942-1.433,5.839,5.839,0,0,1,3.853.575,14.471,14.471,0,0,1,2.1,1.388c.373.284.739.576,1.117.853a6.18,6.18,0,0,0,2.857,1.113,18.872,18.872,0,0,0,3.391.071,3.772,3.772,0,0,0,1.866-.611c.325-.206.633-.44.938-.676a11.861,11.861,0,0,0,1.854-1.761c.088-.106.185-.2.273-.31a5.779,5.779,0,0,1,2.666-1.738,9.509,9.509,0,0,1,2.092-.475,6.035,6.035,0,0,1,2.374.224,1.324,1.324,0,0,1,.394.213.18.18,0,0,1-.031.31,1.3,1.3,0,0,1-.391.117,1.376,1.376,0,0,1-.412-.02,3.349,3.349,0,0,0-1.553.1,5.467,5.467,0,0,0-2.565,1.591c-.338.363-.661.739-1,1.1a14.105,14.105,0,0,1-2.531,2.116,6.435,6.435,0,0,1-2.738.985,17.659,17.659,0,0,1-2.935.1c-.537-.021-1.075-.025-1.612-.089a11.658,11.658,0,0,1-2.14-.446c-.38-.12-.753-.266-1.123-.417a6.83,6.83,0,0,1-1.545-.869c-.65-.488-1.3-.981-1.955-1.458a10.7,10.7,0,0,0-.909-.572,3.357,3.357,0,0,0-.492-.213,1.1,1.1,0,0,0-.569-.043,8.89,8.89,0,0,0-2.477.767c-.4.187-.787.4-1.174.608-1.018.554-2.077,1.02-3.14,1.476-.544.234-1.088.469-1.636.693a9.508,9.508,0,0,1-2.515.636,14.555,14.555,0,0,1-2.893.06,9.352,9.352,0,0,1-3.4-.95,20.648,20.648,0,0,1-2.466-1.43,5.825,5.825,0,0,0-1.912-.855,2.634,2.634,0,0,0-1.269,0,5.891,5.891,0,0,0-.707.227,16.1,16.1,0,0,0-2.294,1.135,5.056,5.056,0,0,0-.832.677c-.387.352-.773.706-1.183,1.031a5.093,5.093,0,0,1-2.327,1.006,7.741,7.741,0,0,1-2.39.062,5.441,5.441,0,0,1-2.121-.771,9.6,9.6,0,0,1-1.41-1.078c-.811-.727-1.671-1.393-2.547-2.041a3.336,3.336,0,0,0-1.921-.649,5.742,5.742,0,0,0-2.313.343c-.373.141-.752.269-1.125.41a3.476,3.476,0,0,0-.857.492,2.024,2.024,0,0,1-2.08.194.7.7,0,0,1-.174-.11.374.374,0,0,1-.06-.6,2.472,2.472,0,0,1,.43-.385,5.023,5.023,0,0,1,.743-.445,14.54,14.54,0,0,1,2.769-.95,7.041,7.041,0,0,1,1.93-.19"
            transform="translate(-34.212 -128.555)"></path>
        </svg>
        <h1 className="text-5xl font-primary font-bold mb-5 text-center">
          Details
        </h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase text-base">
              Ingredients
            </AccordionTrigger>
            <AccordionContent>{product.ingredients}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="uppercase text-base">
              How To Use
            </AccordionTrigger>
            <AccordionContent>{product.how_to}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="uppercase text-base">
              Scent
            </AccordionTrigger>
            <AccordionContent>{product.scent}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="uppercase text-base">
              Size
            </AccordionTrigger>
            <AccordionContent>{product.size}ml</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Encouragements />
      <ReviewsSection productId={product.id} />
    </div>
  );
}
