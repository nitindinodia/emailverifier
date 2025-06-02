const dns = require('dns').promises;

const records = await dns.resolveMx(domain);
