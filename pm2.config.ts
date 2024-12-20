module.exports = {
    apps: [
        {
            name: "sgpms_backend",
            script: "dist/bun-server.js",
            interpreter: "bun",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
}