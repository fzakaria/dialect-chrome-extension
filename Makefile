PRETTIER := $(shell yarn bin prettier)

js-lint: $(wildcard *.js)
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

html-lint: $(wildcard *.html)
	@echo "Formatting Javascript files: $^"
	$(PRETTIER) --write $^

lint: js-lint html-lint

.PHONY: js-lint html-lint lint