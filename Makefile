install:
	npm ci

setup: install
	npm link

lint:
	npx eslint .

.PHONY: install setup lint
