if (process.env.NODE_ENV !== 'production') {
  (async () => {
    await import('source-map-support/register');
  })();
}
