js-lint: $(wildcard *.js)
	@prettier --write $^


.PHONY: js-lint