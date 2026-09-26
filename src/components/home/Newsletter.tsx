"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    showToast("Thanks for subscribing!");
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="font-display text-2xl text-neutral-900 sm:text-3xl">Stay in Style</h2>
      <p className="max-w-sm text-sm text-neutral-600">
        Get updates on new arrivals and special offers.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full flex-1 border border-line bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
        />
        <button
          type="submit"
          className="whitespace-nowrap bg-neutral-900 px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700"
        >
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="text-xs text-neutral-500">
          You&apos;re on the list — thank you for joining NOIRÉ.
        </p>
      )}
    </div>
  );
}
