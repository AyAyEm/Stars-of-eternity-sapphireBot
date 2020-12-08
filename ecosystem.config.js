module.exports = {
  apps: [{
    script: './dist/eternity.js',
    ignore_watch: ['node_modules'],
    max_memory_restart: '512M',
    name: 'stars-of-eternity-bot',
    watch: ['./dist'],
    watch_delay: 1000,
    cron_restart: '0 0 0 * * ?',
    env: {
      NODE_ENV: 'production',
    },
  }],
}
