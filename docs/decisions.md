# Stack

* Navigation choice: React Navigation
* Fetching strategy: React Query
* Folder structure: Feature-based
* State management: Zustand
* Testing framework: Jest
* Testing library: React Native Testing Library
* End-to-end testing framework: Detox
* UI library: React Native Paper
* TypeScript configuration: Strict mode enabled
* Code formatting: Prettier with default settings
* Linting: ESLint
* Continuous Integration: GitHub Actions
* Linting rules: Prettier

# Decisions (ADR-lite)

## Platform / runtime
- Expo (managed workflow) to move fast and avoid native build setup for the exercise.

## Navigation
- React Navigation + native-stack.
- Structure: Tabs (Issues, Saved) + nested stack for Issues (List -> Detail).
- Rationale: common production pattern; isolates Saved from deep links and keeps stacks small.

## Data fetching (server state)
- React Query for GitHub API data (issues list + issue detail).
- Query keys: ['issues', owner, repo, state, sort] and ['issue', owner, repo, number].
- Rationale: caching, dedupe, retries, background refetch, easy testability with QueryClient.

## Client state (local/UI)
- Zustand for persisted local state only:
  - saved issue IDs (+ optional saved summaries for offline)
  - selected repo / UI prefs (optional)
- Rationale: keep server state out of global store; avoid duplication and manual cache invalidation.

## Caching strategy
- React Query:
  - staleTime: 60s for lists; 5m for issue detail (tweakable)
  - cacheTime: default (or 15m if set explicitly)
  - refetchOnFocus: true (mobile app typical), refetchOnReconnect: true
- Persistence:
  - AsyncStorage for saved issues (key: saved_issues_v1)
  - (Optional) persist selected repo.

## Error strategy
- Normalize errors in api layer into:
  - { kind: 'network' | 'http' | 'rate_limit' | 'unknown', status?, message, retryAfter? }
- UI:
  - Inline banner + Retry
  - Rate limit message includes reset time if available from headers.

## Folder structure
- Feature-first:
  - src/features/issues/* (screens/components/api/hooks/model)
  - src/features/saved/* (store/screens)
  - src/shared/* (http client, storage, reusable UI)
- Rule: screens orchestrate; components present; api layer has no React imports.

## Testing
- Unit: model mapper + error normalization.
- Component: screen renders loading/error/empty with mocked fetcher + QueryClient.
- CI: GitHub Actions runs lint, typecheck, tests.