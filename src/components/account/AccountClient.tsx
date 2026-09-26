"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export function AccountClient() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showToast("This is a demo — account features are not connected to a backend.");
  }

  return (
    <Container>
      <div className="mx-auto max-w-md py-10 sm:py-14">
        <SectionHeading
          eyebrow="Demo"
          title="Account"
          subtitle="This is a demo account area for presentation purposes only."
        />

        <div className="mt-8 flex border-b border-line">
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 border-b-2 py-3 text-xs font-medium uppercase tracking-wider",
                tab === t ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-400"
              )}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {tab === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-neutral-700">Full Name</label>
              <input type="text" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900" />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-neutral-700">Email</label>
            <input type="email" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-neutral-700">Password</label>
            <input type="password" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900" />
          </div>
          <button
            type="submit"
            className="mt-2 bg-neutral-900 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700"
          >
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-400">
          Demo Website by CodePixel Web — account creation is not functional in this preview.
        </p>
      </div>
    </Container>
  );
}
