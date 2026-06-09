import Link from "next/link";

export function FooterLogo() {
  return (
    <Link href="/" className="inline-flex shrink-0 transition-opacity hover:opacity-90" aria-label="venuze">
      <img src="/footer-logo.svg" alt="venuze" width={67} height={45} className="block h-[45px] w-auto shrink-0" />
    </Link>
  );
}
