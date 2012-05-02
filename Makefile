TESTS = $(shell find test/ -name '*.test.js')

test:
	@NODE_ENV=test ./node_modules/expresso/bin/expresso \
		$(TESTFLAGS) \
		$(TESTS)
	@node test/dropdb.js

test-cov:
	@TESTFLAGS=--cov $(MAKE) test

.PHONY: test test-cov
