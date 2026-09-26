import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function PromoBanner() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden bg-neutral-900">
          <div className="relative aspect-[4/5] sm:aspect-[21/9]">
            <Image
              src="/images/promo/banner.jpg"
              alt="Effortless style, every day"
              fill
              sizes="100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-neutral-950/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h2 className="font-display max-w-lg text-3xl font-medium sm:text-5xl">
                Effortless Style, Every Day
              </h2>
              <p className="mt-4 max-w-sm text-sm text-white/85 sm:text-base">
                Curated fashion designed to fit your everyday life.
              </p>
              <LinkButton href="/collections" variant="secondary" size="lg" className="mt-8">
                Explore Collection
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
