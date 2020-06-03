/* eslint-disable global-require, no-console, import/no-dynamic-require */
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { object: { flatten } } = require('@asefux/common');

const client = new SecretManagerServiceClient();

const getSecret = async (name, config = {}) => {
  if (process.env.NODE_ENV === 'development') {
    const homedir = require('os').homedir();
    let secretsPath = `${homedir}/.secrets-dev/secrets`;
    try {
      const p = require(`${process.cwd()}/package.json`);
      secretsPath = `${homedir}/.${p.name}-dev/secrets`;
      console.log(`using ${secretsPath}`);
    } catch (e) {
      console.warn(`using ${secretsPath}`);
    }
    config.secrets = require(secretsPath);
  }


  const flattenedConfig = flatten(config);


  const secretNameKey = `secrets.${name}`;
  if (!flattenedConfig[secretNameKey]) {
    throw new Error(`unkonwn secret ${name} `);
  }
  const secretName = flattenedConfig[secretNameKey];
  if (process.env.NODE_ENV === 'development') {
    return secretName;
  }

  const versions = await client.accessSecretVersion({
    name: secretName,
  });
  const version = versions[versions.length - 1];
  return version.payload.data.toString('utf8');
};

module.exports = getSecret;
