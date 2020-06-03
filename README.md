# @asefux/secret

`npm install --save @asefux/secret`

exports function that reads a secret from google-cloud/secrets or from disk if NODE_ENV=development
file will be located in
~/.secrets-dev/secrets
or if a package.json is defined it will read from
~/.${package.name}-dev/secrets
an index.js file must be present in secrets folder (or secrets.js)

## usage -dev

```javascript

process.env.NODE_ENV='development';

const getSecret = require('@asefux/secret');

const aSecret = await getSecret('some.secret.nested.in.config.secrets');

```

## usage -prod

```javascript
// config.js
module.exports = { secrets: {some: { secret: {nested: '/the/secret/google/cloud/resource/id'} }}};

// loading secret file
const getSecret = require('@asefux/secret');
const config = require('./config');
const aSecret = await getSecret('some.secret.nested', config);
// `aSecret` will hold last version of /the/secret/google/cloud/resource/id

```

### changes

<table>
<thead>
<tr>
<th>Version</th><th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.0.0</td><td>loads lats version of a secret/resource/id</td>
</tr>
<tr>
<td>1.0.1</td><td>license and readme</td>
</tr>
</tbody>
</table>
