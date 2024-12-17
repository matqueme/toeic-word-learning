import example from './example';

export default defineI18nLocale(async () => {
  return {
    welcome: 'Bienvenue dans notre application',
    example,
  };
});
