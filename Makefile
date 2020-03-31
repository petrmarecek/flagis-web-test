SHELL	:= sh
PATH	:= node_modules/.bin:$(PATH)

dev-local:
	NODE_ENV=development COMPILE_ENV=local node server

dev:
	NODE_ENV=development COMPILE_ENV=development node server

builddll:
	npm run build:dll

lint:
	npm run lint

test:
	npm run test
