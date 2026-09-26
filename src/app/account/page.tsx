import type { Metadata } from "next";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in or create your NOIRÉ account.",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return <AccountClient />;
}
