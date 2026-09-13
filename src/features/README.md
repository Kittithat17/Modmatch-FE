# features

This folder splits code by business domain, not by file type. The goal is that each feature stands on its own, so people working in parallel rarely touch the same files.

## Shape of one feature

```
src/features/matching/
├── components/      components used only by this feature
├── hooks/           React hooks belonging to this feature
├── api.ts           backend calls for this feature (go through src/lib/api-client)
└── types.ts         types for this feature
```

## Rules

- A feature must not import directly from another feature. If two features need the same thing, lift it up into `src/components`, `src/lib` or `src/types`.
- `src/app` only does routing, page composition and page-level data fetching. The real logic lives in a feature.
- `src/components/ui` holds components with no business logic, such as Button, Input and Card. They are reusable anywhere.
