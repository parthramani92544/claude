import { useState } from 'react';
import { PlastoShipLogo } from './PlastoShipLogo';

/**
 * SCREEN — Manufacturer Login
 *
 * Entry point to the PlastoShip manufacturer business portal. Deliberately a
 * single, quiet, centred card: this is a premium extension of the PlastoShip
 * marketplace website, not an admin console. Nothing beyond the two fields,
 * the Continue CTA and the help link belongs on this screen.
 */
export function ManufacturerLogin({
  onContinue,
}: {
  onContinue?: (credentials: { identifier: string; secret: string }) => void;
}) {
  const [identifier, setIdentifier] = useState('');
  const [secret, setSecret] = useState('');
  const [secretVisible, setSecretVisible] = useState(false);

  return (
    <div className="ps-root ps-login">
      <main className="ps-login__shell">
        <header className="ps-login__head">
          <PlastoShipLogo />

          <div className="ps-login__welcome">
            <h1 className="ps-login__title">Welcome Back, Manufacturer</h1>
            <p className="ps-login__subtitle">
              Manage your products, orders and business growth
            </p>
          </div>
        </header>

        <section className="ps-card" aria-label="Manufacturer sign in">
          <form
            className="ps-form"
            onSubmit={(event) => {
              event.preventDefault();
              onContinue?.({ identifier, secret });
            }}
          >
            <div className="ps-field">
              <label className="ps-field__label" htmlFor="ps-identifier">
                Mobile Number / Email
              </label>
              <input
                id="ps-identifier"
                className="ps-input"
                type="text"
                inputMode="email"
                autoComplete="username"
                placeholder="Enter mobile number or email"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </div>

            <div className="ps-field">
              <label className="ps-field__label" htmlFor="ps-secret">
                Password / OTP
              </label>
              <div className="ps-input-wrap">
                <input
                  id="ps-secret"
                  className="ps-input ps-input--secret"
                  type={secretVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter password or OTP"
                  value={secret}
                  onChange={(event) => setSecret(event.target.value)}
                />
                <button
                  type="button"
                  className="ps-reveal"
                  onClick={() => setSecretVisible((visible) => !visible)}
                  aria-label={secretVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={secretVisible}
                >
                  {secretVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" className="ps-button">
              Continue
            </button>
          </form>
        </section>

        <p className="ps-login__help">
          <a className="ps-link" href="#support">
            Need Help?
          </a>
        </p>
      </main>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M1.9 10S4.9 4.6 10 4.6 18.1 10 18.1 10 15.1 15.4 10 15.4 1.9 10 1.9 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8.1 4.9a7.7 7.7 0 0 1 1.9-.3c5.1 0 8.1 5.4 8.1 5.4a14.6 14.6 0 0 1-2.4 3.1M5.4 5.9A14.5 14.5 0 0 0 1.9 10s3 5.4 8.1 5.4c1.5 0 2.8-.5 3.9-1.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.3 8.3a2.4 2.4 0 0 0 3.4 3.4M2.8 2.8l14.4 14.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ManufacturerLogin;
