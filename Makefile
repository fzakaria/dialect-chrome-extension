PRETTIER := $(shell yarn bin prettier)

js-lint: $(wildcard *.js)
	@echo $(PRETTIER)
	$(PRETTIER) --write $^


.PHONY: js-lint