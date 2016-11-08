window.Trepo = require('trepo-core');

window.trepo = new Trepo('test');

window.fetch = (url, options) => trepo.request(options.body);
