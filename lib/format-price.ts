export default function formatPrice(price: number) {
  return new Intl.NumberFormat("ro", {
    style: "currency",
    currency: "RON",
  }).format(price);
}
