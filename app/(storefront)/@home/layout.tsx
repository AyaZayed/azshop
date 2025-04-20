import React from "react";

export default function HomeLayout({
  featured,
  hero,
  protection,
  superFeatured,
  featuredReviews,
}: {
  featured: React.ReactNode;
  hero: React.ReactNode;
  protection: React.ReactNode;
  superFeatured: React.ReactNode;
  featuredReviews: React.ReactNode;
}) {
  return (
    <>
      {hero}
      {featured}
      {superFeatured}
      {featuredReviews}
      {protection}
    </>
  );
}
