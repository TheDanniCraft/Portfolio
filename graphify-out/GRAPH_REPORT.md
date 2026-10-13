# Graph Report - portfolio-cookie-banner-pr  (2026-10-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 358 nodes · 547 edges · 18 communities (15 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c2bb9e24`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 15 edges
3. `pageMetadata()` - 12 edges
4. `@gravity-ui/icons` - 12 edges
5. `@heroui/react` - 11 edges
6. `react` - 11 edges
7. `LegalPage()` - 9 edges
8. `ConsentInterface()` - 9 edges
9. `ProjectImage()` - 9 edges
10. `ProjectInquiryForm()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `ProjectImage()`  [EXTRACTED]
  app/page.tsx → components/project-image.tsx
- `ProjectInquiryForm()` --calls--> `submitInquiry()`  [EXTRACTED]
  components/project-inquiry-form.tsx → app/actions/submit-inquiry.ts
- `RootLayout()` --calls--> `SiteNavbar()`  [EXTRACTED]
  app/layout.tsx → components/site-navbar.tsx
- `ImprintPage()` --calls--> `LegalPage()`  [EXTRACTED]
  app/legal/imprint/page.tsx → components/legal-page.tsx
- `PrivacyPage()` --calls--> `LegalPage()`  [EXTRACTED]
  app/legal/privacy/page.tsx → components/legal-page.tsx

## Import Cycles
- None detected.

## Communities (18 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (43): eslintConfig, engines, node, ignoreScripts, name, overrides, figlet, tar (+35 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (29): ContactPage(), ContactTile, contactTiles, metadata, Home(), metadata, AvailabilityIndicator(), availabilityStyles (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (20): dynamic, inter, metadata, RootLayout(), dynamic, ConsentManager(), FooterColumn, footerColumns (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (27): capResponseSchema, inquirySchema, submitInquiry(), SubmitInquiryResult, ChatwootEnvironment, chatwootEnvironmentSchema, ChatwootRequestError, contactCreateSchema (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (23): CookiesPage(), metadata, StorageServiceCard(), storageServices, ConsentInterface(), CookiePreferencesButton(), europePolicy, getHydratedSnapshot() (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (30): config:recommended, additionalBranchPrefix, branchPrefix, commitMessageAction, commitMessageExtra, commitMessagePrefix, commitMessageTopic, dependencyDashboard (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (28): dependencies, c15t, @c15t/nextjs, cap-widget, embla-carousel, embla-carousel-react, @gravity-ui/icons, @heroui-pro/react (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (19): CaseStudiesPage(), metadata, FilterId, WorkPage(), generateMetadata(), PageProps, ProjectCaseStudy(), ProjectImage() (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+12 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (7): nextBin, result, candidates, requireFromReactPdf, nextBin, plausibleScriptName, result

### Community 10 - "Community 10"
Cohesion: 0.21
Nodes (10): ImprintPage(), metadata, metadata, PrivacyPage(), metadata, PrivacyRequestsPage(), legalDocuments, LegalPage() (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (8): metadata, cap-widget, react, react-pdf, CapWidgetAttributes, IntrinsicElements, JSX, react

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (10): devDependencies, @babel/core, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (7): deploy, startCommand, packages, bun, node, provider, $schema

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (6): background_color, display, icons, name, short_name, theme_color

## Knowledge Gaps
- **23 isolated node(s):** `@babel/core`, `c15t`, `embla-carousel`, `embla-carousel-react`, `@heroui/styles` (+18 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 221 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 7`, `Community 10`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **What connects `@babel/core`, `c15t`, `embla-carousel` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Community 6` to `Community 0`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1021021021021021 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Community 11` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 7`, `Community 10`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0855614973262032 - nodes in this community are weakly interconnected._