module.exports = {
    apps: [
        {
            name: "nextjs-app-1",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};
