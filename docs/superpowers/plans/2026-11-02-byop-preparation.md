# Repository Preparation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task. The existing task authorization covers the local cleanup described here.

**Goal:** Prepare a reviewable local cleanup and an accurate submission assessment.

**Architecture:** Keep the existing component, CLI and legacy CDK layout. Replace real sample data and remove generated artifacts; audit Git without changing commits or author identities.

**Tech Stack:** JavaScript Web Components, webpack, TypeScript CDK, npm and Git.

**Spec:** The maintainer's repository cleanup request and the BYOP project submission instructions reviewed on 2026-11-02.

## Global Constraints

- Preserve preexisting changes, authorship and copyright notices.
- Do not print credentials, test them against AWS, rewrite Git history, push, or delete cloud resources.
- Keep MIT as requested, preserve the historical ISC provenance, and distinguish the maintainer's ownership statement from third-party confirmation.
- Record observed work; do not claim committed hours, releases, users or tests that do not exist.

## Review Focus

- Current cleanup cannot remove secrets from earlier commits or external clones.
- Git author emails are attribution metadata; a blanket rewrite can break contribution evidence.
- Legacy demos may reference retired infrastructure or third-party remote assets.
- A successful webpack build does not prove browser behavior; the existing Jest test has no assertions.
- Employer support and repository moves require truthful disclosure to the program.

### Task 1: Audit and clean the current tree

- [x] Record the clean starting state, refs, reachable commits and secret fingerprints.
- [x] Replace captured request data and personal contact examples; retain author names.
- [x] Remove logs, local state, stale deployment outputs and unrelated proprietary binaries; extend ignore rules.
- [x] Replace the unverified portrait with a local, fictional SVG avatar.
- [x] Review historical secrets and account associations using redacted fingerprints only.

### Task 2: Repair documentation and license metadata

- [x] Correct clone paths, package commands, stale status and component links in the READMEs.
- [x] Document observed remaining work in ROADMAP.md with concrete acceptance criteria.
- [x] Align first-party package metadata with MIT and record historical ISC terms without changing attribution.
- [x] Write a local submission assessment with unresolved history, provenance and eligibility questions.

### Task 3: Verify

- [x] Run the root build and test, record the absent lint script, and run the library production build and local server smoke check.
- [x] Check fixture validity, privacy replacements, JSON metadata, Markdown links and formatting of edited files.
- [x] Rescan the working tree and confirm the original refs and commit counts remain unchanged.
