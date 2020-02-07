PRETTIER = $(shell yarn bin prettier)

all: lint release

node_modules: yarn.lock
	@echo "Installing dependencies"
	@yarn install

jsonlint: $(wildcard *.json) node_modules
	@echo "Formatting JSON files: $^"
	$(PRETTIER) --write $^

jslint: $(wildcard *.js) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

htmllint: $(wildcard *.html) node_modules
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: jslint htmllint jsonlint


dialect-chrome-extension.zip: manifest.json $(wildcard *.html) $(wildcard *.js)
	@zip dialect-chrome-extension.zip $^

release: dialect-chrome-extension.zip

.PHONY: jslint htmllint jsonlint lint release 

.DEFAULT_GOAL: all