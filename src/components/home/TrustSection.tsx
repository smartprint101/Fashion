import { Container } from "@/components/ui/Container";

const items = [
  {
    title: "Fast Delivery",
    description: "Quick delivery across Bangladesh.",
    color: "#2f6b52",
    bg: "#e7f1ec",
    icon: (
      <path d="M3 12h13M10 6l6 6-6 6M17 6h2a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
    ),
  },
  {
    title: "Secure Shopping",
    description: "Safe and reliable shopping experience.",
    color: "#6d2f4d",
    bg: "#f4e9ef",
    icon: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  },
  {
    title: "Easy Support",
    description: "Customer support whenever you need it.",
    color: "#9c7a3c",
    bg: "#f6efdf",
    icon: (
      <path d="M4 12a8 8 0 1116 0v3a2 2 0 01-2 2h-1v-6h3M4 15v-3h3v6H6a2 2 0 01-2-2z" />
    ),
  },
  {
    title: "Quality Products",
    description: "Carefully selected fashion products.",
    color: "#b8455f",
    bg: "#fbe9ee",
    icon: <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />,
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-line bg-mist py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full shadow-sm"
                style={{ backgroundColor: item.bg }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-xs text-neutral-600 sm:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
