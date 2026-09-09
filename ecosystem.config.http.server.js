module.exports = {
  apps: [
    {
      name: "cost-tracking-frontend",

      script: "C:/Program Files/nodejs/http-server.cmd",

      args: "build -p 80 -a 0.0.0.0",

      cwd: "C:/Programs/Cost Tracking/frontend",

      windowsHide: true,

      autorestart: true,

      watch: false,

      exec_mode: "fork",

      instances: 1,
    },
  ],
};