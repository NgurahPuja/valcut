export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.pujabagus.compressFoto.dev';
  }

  if (IS_PREVIEW) {
    return 'com.pujabagus.compressFoto.preview';
  }

  return 'com.pujabagus.compressFoto';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'CompressFoto (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Valcut (Preview)';
  }

  return 'Valcut';
};

