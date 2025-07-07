import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const TYPE_MAX_LENGTH = 10;
const SCOPE_MAX_LENGTH = 15;
const SUBJECT_MAX_LENGTH = 50;
const HEADER_MAX_LENGTH = SUBJECT_MAX_LENGTH + SCOPE_MAX_LENGTH + TYPE_MAX_LENGTH;
const BODY_MAX_LENGTH = 150;
const FOOTER_MAX_LENGTH = 100;

const prompt: UserConfig['prompt'] = {
  messages: {
    emptyWarning: 'Cannot send empty string!',
    lowerLimitWarning: 'Message is too short!',
    upperLimitWarning: 'Messsage is too long!',
  },
  questions: {
    footer: {
      messages: {
        whatIs: 'Footer must contain link to task!',
      },
    },
  },
  settings: {},
};

const typeConfig: UserConfig['rules'] = {
  'type-case': [RuleConfigSeverity.Error, 'always', 'lowercase'],
  'type-max-length': [RuleConfigSeverity.Error, 'always', TYPE_MAX_LENGTH],
  'type-enum': [
    RuleConfigSeverity.Error,
    'always',
    ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
  ],
};

const scopeConfig: UserConfig['rules'] = {
  'scope-case': [RuleConfigSeverity.Error, 'always', 'lowercase'],
  'scope-max-length': [RuleConfigSeverity.Error, 'always', SCOPE_MAX_LENGTH],
};

const subjectConfig: UserConfig['rules'] = {
  'subject-case': [RuleConfigSeverity.Error, 'always', 'lowercase'],
  'subject-max-length': [RuleConfigSeverity.Error, 'always', SUBJECT_MAX_LENGTH],
};

const headerConfig: UserConfig['rules'] = {
  'header-case': [RuleConfigSeverity.Error, 'always', 'lowercase'],
  'header-max-length': [RuleConfigSeverity.Error, 'always', HEADER_MAX_LENGTH],
};

const bodyConfig: UserConfig['rules'] = {
  'body-empty': [RuleConfigSeverity.Disabled, 'never'],
  'body-case': [RuleConfigSeverity.Error, 'always', 'lowercase'],
  'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
  'body-max-length': [RuleConfigSeverity.Error, 'always', BODY_MAX_LENGTH],
};

const footerConfig: UserConfig['rules'] = {
  'footer-empty': [RuleConfigSeverity.Disabled, 'never'],
  'footer-max-length': [RuleConfigSeverity.Error, 'always', FOOTER_MAX_LENGTH],
};

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  helpUrl,
  prompt,
  rules: {
    ...typeConfig,
    ...scopeConfig,
    ...subjectConfig,
    ...headerConfig,
    ...bodyConfig,
    ...footerConfig,
  },
};

export default config;
