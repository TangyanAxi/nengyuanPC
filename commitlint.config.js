// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'style', 'perf', 'refactor', 'revert', 'test', 'docs', 'chore', 'workflow', 'ci', 'types', 'wip']],
    'header-max-length': [0, 'always', 72],
  },
};
