PRETTIER := $(shell yarn bin prettier)

all: lint

node_modules: yarn.lock
	@echo "Installing dependencies"
	@yarn install

js-lint: $(wildcard *.js) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

html-lint: $(wildcard *.html) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: js-lint html-lint

.PHONY: js-lint html-lint lint test

.DEFAULT_GOAL: all