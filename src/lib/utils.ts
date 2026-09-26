export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function generateOrderId(): string {
  const random = Math.floor(10000 + Math.random() * 89999);
  return `#NOI-${random}`;
}
