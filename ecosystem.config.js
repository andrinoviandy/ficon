module.exports = {
  apps: [
    {
      name: "ficon",

      script: "cmd",

      args: "/c serve -s build -l 8005",

      cwd: "C:/Programs/ficon",

      instances: 1,

      exec_mode: "fork",

      autorestart: true,

      watch: false,

      env: {
        NODE_ENV: "production",
      },
    },
  ],
};