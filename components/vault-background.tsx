/**
 * Fixed full-viewport vault: girih geometry + radial spotlight.
 * Sits under `z-10` app chrome so content glides over the pattern.
 */
export function VaultBackground() {
  return (
    <div className="vault-bg-wrap" aria-hidden>
      <div className="vault-bg-girih" />
      <div className="vault-bg-atmosphere" />
    </div>
  );
}
