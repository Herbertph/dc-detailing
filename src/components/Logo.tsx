export function Logo() {
  return (
    <span className="flex flex-col items-center leading-none">
      <span className="font-heading text-xl font-bold italic tracking-wide text-white">DC DETAILING</span>
      <span className="mt-1 flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-brand-muted">
        <span aria-hidden="true" className="h-px w-5 bg-brand-muted" />
        SERVICES
        <span aria-hidden="true" className="h-px w-5 bg-brand-muted" />
      </span>
    </span>
  )
}
