import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <span className="font-display text-6xl text-neutral-300">404</span>
        <h1 className="font-display text-2xl text-neutral-900">Page Not Found</h1>
        <p className="max-w-sm text-sm text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <LinkButton href="/" size="lg" className="mt-2">
          Back to Home
        </LinkButton>
      </div>
    </Container>
  );
}
