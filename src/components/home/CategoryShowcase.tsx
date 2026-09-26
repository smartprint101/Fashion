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
                className="group relative block aspect-[3/4] overflow-hidden bg-neutral-100"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-6 text-white">
                  <h3 className="font-display text-2xl">{category.name}</h3>
                  <p className="text-sm text-white/85">{category.description}</p>
                  <span className="mt-2 text-xs font-medium uppercase tracking-wider underline underline-offset-4">
                    Shop Now
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
