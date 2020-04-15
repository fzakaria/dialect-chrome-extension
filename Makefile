YARN = $(shell npm bin)/yarn

PRETTIER = $(shell npm bin)/prettier

all: lint-check release

node_modules: yarn.lock
	@echo "Installing dependencies"
	$(YARN) install

jsonlint: $(wildcard *.json) node_modules
	@echo "Formatting JSON files: $^"
	$(PRETTIER) --write $^

jslint: $(wildcard *.js) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

htmllint: $(wildcard *.html) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: node_modules jslint htmllint jsonlint

lint-check: $(wildcard *.json) $(wildcard *.html) $(wildcard *.js)
	@echo "Verifying that the script is linted"
	$(PRETTIER) --check $^ || (echo "prettier failed validating linted $$?"; exit 1)

dialect-chrome-extension.zip: manifest.json $(wildcard *.html) $(wildcard *.js)
	@zip dialect-chrome-extension.zip $^

release: dialect-chrome-extension.zip

.PHONY: jslint htmllint jsonlint lint release 

.DEFAULT_GOAL: all
