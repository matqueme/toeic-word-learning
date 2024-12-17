import example from './example';

export default defineI18nLocale(async () => {
  return {
    welcome: 'Welcome to our application',
    example,
  };
});
