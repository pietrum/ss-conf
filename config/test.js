module.exports = {
  merge: {
    env: 'test',
  },
  env: {
    SS_CONF_TEST: process.env.SS_CONF_TEST,
    SS_CONF_VOID: process.env.SS_CONF_VOID,
  },
  nested: {
    test: {
      env: 'test',
    },
    false: false,
  },
};
