import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { collections } from "@/data/categories";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated NOIRÉ collections — editorial edits for every occasion.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <SectionHeading
          eyebrow="Curated"
          title="Collections"
          subtitle="Editorial edits built around the way you actually get dressed."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug} delay={i * 80}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden bg-neutral-100"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl">{collection.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{collection.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
