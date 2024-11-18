"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <OnboardingCheck>{children}</OnboardingCheck>
    </SessionProvider>
  );
}

function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isOnboardingComplete) {
      router.push("/onboarding");
    }
  }, [status, session, router]);

  return <>{children}</>;
}
