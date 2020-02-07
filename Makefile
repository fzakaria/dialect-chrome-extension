PRETTIER := $(shell yarn bin prettier)

all: lint

node_modules: yarn.lock
	@echo "Installing dependencies"
	@yarn install

jslint: $(wildcard *.js) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

htmllint: $(wildcard *.html) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: jslint htmllint

.PHONY: jslint htmllint lint test

.DEFAULT_GOAL: all