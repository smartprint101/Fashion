import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-neutral-900 sm:min-h-[88svh]">
      <Image
        src="/images/hero/hero-women-1.jpg"
        alt="NOIRÉ new season editorial"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
      <Container className="relative z-10 pb-14 pt-32 sm:pb-20">
        <div className="max-w-xl animate-fade-in-up text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold ring-1 ring-white/20 backdrop-blur">
            New Season 2026
          </span>
          <h1 className="font-display mt-5 text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
            Elevate Your <span className="text-gradient-gold">Everyday</span> Style
          </h1>
          <p className="mt-5 max-w-md text-sm text-white/85 sm:text-base">
            Discover thoughtfully selected fashion pieces designed for modern
            everyday living.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/women" variant="gold" size="lg">
              Shop Women
            </LinkButton>
            <LinkButton
              href="/men"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-neutral-900"
            >
              Shop Men
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
