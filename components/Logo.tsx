export default function Logo({ className = '' }: { className?: string }) {
  return <span className={`brand-logo ${className}`} aria-label="Ampliga">Ampliga.</span>;
}
