# Repository Guidelines

## Project Structure & Module Organization

This workspace currently contains no source files, tests, assets, or project manifest. When adding code, keep application code, tests, and static assets in clearly named directories (for example, `src/`, `tests/`, and `assets/`) and place each module's tests near it or in the established test tree. Update this guide when the repository adopts a concrete layout.

## Build, Test, and Development Commands

No build or run commands are defined yet. Before contributing to a populated project, check its README and manifests (such as `package.json`, `pyproject.toml`, or a `Makefile`) and use the commands recorded there. Document new standard commands in the README and keep them runnable from the repository root.

## Coding Style & Naming Conventions

Follow the formatter, linter, and language conventions already selected by the project; do not introduce a competing tool without a clear need. Use descriptive names, consistent casing within each language, and small modules with focused responsibilities. Format changed files with the project's configured formatter before submitting.

## Testing Guidelines

No test framework or coverage target is configured yet. Add tests using the framework chosen by the project, name them consistently with neighboring tests, and run the relevant documented test command for each change. Include a regression test when fixing a defect.

## Commit & Pull Request Guidelines

Git history is unavailable in this workspace, so no repository-specific commit convention can be confirmed. Write concise commit subjects that describe the change. Pull requests should explain the motivation and behavior change, link related issues when available, list validation commands and results, and include screenshots for user-visible interface changes.

## Security & Configuration

Keep credentials and machine-specific settings out of source control. Provide safe examples in configuration templates and document required local setup without including real secrets.

