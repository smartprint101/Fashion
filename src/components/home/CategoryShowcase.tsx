import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 80}>
              <Link
                href={`/${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-sm ring-1 ring-line/60 transition-all duration-300 hover:shadow-[0_24px_50px_-20px_rgba(20,20,20,0.4)]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Solid, stronger gradient so the label is always readable (no washed-out / transparent look) */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-6 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    Collection
                  </span>
                  <h3 className="font-display text-2xl drop-shadow-sm">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur transition-colors group-hover:bg-white group-hover:text-neutral-900">
                    Shop Now
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
