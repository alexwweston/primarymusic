#!/usr/bin/env node

const { MusicRepl } = require('./repl/musicRepl');

new musicRepl({ prompt: '> ' });
