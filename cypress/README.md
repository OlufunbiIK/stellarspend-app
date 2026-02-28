# Cypress E2E Tests

End-to-end tests for StellarSpend covering the critical user journey.

## Running Tests

### Interactive Mode (Development)
```bash
npm run cypress:open
```

### Headless Mode (CI)
```bash
npm run test:e2e
```

### With Dev Server
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run cypress:open
```

## Test Coverage

### user-journey.spec.ts
- **Landing Page**: Verifies hero content, CTAs, and stats
- **Wallet Connection**: Mocks Freighter wallet API
- **Budget Creation**: Tests form validation and submission
- **Transaction Viewing**: Mocks Stellar Horizon API responses
- **Navigation**: Tests CTA links

## Mock Strategy

### Freighter Wallet
- Stubbed via `cy.mockFreighter()` command
- Returns test public key: `GDQP2K...G4W37`
- Mocks `isConnected()`, `getPublicKey()`, `signTransaction()`

### Stellar Horizon API
- Intercepted via `cy.mockStellarAPI()` command
- Mocks `/accounts/**`, `/transactions**`, `POST /transactions`
- Returns fixture data from `cypress/fixtures/`

## Fixtures

- `wallet.json` - Mock wallet connection data
- `transaction.json` - Sample Stellar payment transaction

## Adding New Tests

1. Create spec file in `cypress/e2e/`
2. Use custom commands: `cy.mockFreighter()`, `cy.mockStellarAPI()`
3. Add fixtures to `cypress/fixtures/` if needed
4. Update this README with test description

## CI Integration

Tests run automatically in GitHub Actions on every push/PR.
See `.github/workflows/ci.yml` for configuration.
