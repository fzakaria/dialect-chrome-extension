PRETTIER := $(shell yarn bin prettier)

all: lint

package.json:
	@echo "Installing dependencies"
	@yarn install

js-lint: $(wildcard *.js) package.json
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

html-lint: $(wildcard *.html) package.json
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: js-lint html-lint

.PHONY: js-lint html-lint lint

.DEFAULT_GOAL: all