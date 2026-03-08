"use client";

import dynamic from "next/dynamic";

const LogoIntro = dynamic(() => import("@/components/ui/LogoIntro"), { ssr: false });
const SmoothScrollProvider = dynamic(() => import("@/components/ui/SmoothScrollProvider"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });

export default function ClientProviders({ children }) {
  return (
    <>
      <LogoIntro />
      <ScrollProgress />
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </>
  );
}
