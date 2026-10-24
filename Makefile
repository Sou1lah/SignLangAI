.PHONY: setup dev dev-web dev-mobile dev-api test lint clean thirdparty

setup:
	bash scripts/setup.sh

dev:
	bash scripts/dev.sh

dev-web:
	pnpm --filter website dev

dev-mobile:
	pnpm --filter mobile start

dev-api:
	uv run --directory ai uvicorn app.main:app --reload --port 8000

test:
	uv run --directory ai pytest
	pnpm --filter website exec tsc --noEmit
	pnpm --filter mobile exec tsc --noEmit

lint:
	pnpm --filter website lint
	uv run --directory ai ruff check .

clean:
	rm -rf node_modules website/node_modules mobile/node_modules website/.next mobile/.expo ai/.venv ai/.pytest_cache ai/.ruff_cache

thirdparty:
	bash scripts/clone-thirdparty.sh
