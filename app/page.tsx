"use client";
import Hero from "../components/hero";
import ContentSection from "@/components/ContentSection";
import AppLayout from "@/components/Layout/Index";

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <ContentSection />
    </AppLayout>
  );
}
