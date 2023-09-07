"use client";
import ContentSection from "@/components/ContentSection";
import AuthenticatedHero from "@/components/Home/AuthenticatedHero";
import AppLayout from "@/components/Layout/Index";
import ProtectedView from "@/components/Utils/ProtectedView";

export default function Profile() {
  return (
    <AppLayout>
      <ProtectedView>
        <AuthenticatedHero />
        <ContentSection />
      </ProtectedView>
    </AppLayout>
  );
}
