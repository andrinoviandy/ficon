module.exports = {
  apps: [
    {
      name: "kfcolls-frontend",

      script: "cmd",

      args: "/c serve -s build -l 8002",

      cwd: "C:/Programs/kfcolls/frontend",

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