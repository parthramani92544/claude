/**
 * PlastoShip brand lockup — mark + wordmark.
 *
 * Ink Navy carries the identity; Dispatch Orange appears once, as the
 * dispatch arrow inside the mark and on the "Ship" syllable. No gradients,
 * no effects — the mark reads cleanly at every size.
 */
export function PlastoShipLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 32 : 40;

  return (
    <div className={`ps-logo ps-logo--${size}`} role="img" aria-label="PlastoShip">
      <svg
        className="ps-logo__mark"
        width={box}
        height={box}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="40" height="40" rx="11" fill="var(--ps-ink-navy)" />
        {/* Stylised shipping crate — the marketplace half of the mark. */}
        <path
          d="M11 15.4 20 11l9 4.4v9.2L20 29l-9-4.4v-9.2Z"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M11 15.4 20 20l9-4.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Dispatch arrow — the single point of Dispatch Orange, sitting alone
            in the crate body so it stays legible down to 32px. */}
        <path
          d="M16 24.2h7.4m0 0-2.6-2.6m2.6 2.6-2.6 2.6"
          stroke="var(--ps-dispatch-orange)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="ps-logo__word" aria-hidden="true">
        Plasto<span className="ps-logo__word-accent">Ship</span>
      </span>
    </div>
  );
}

export default PlastoShipLogo;
