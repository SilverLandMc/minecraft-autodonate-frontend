module.exports = {
    entry: ['./src/index.tsx', './vite/vite.config.ts'],
    project: ['./src/**/*.{js,ts,tsx}', './vite/**/*.{js,ts,tsx}'],
    vite: false,
    vitest: false,
    rules: {
        enumMembers: 'off'
    },
    ignore: ['**/firebase-messaging-sw.js', 'build/**']
};
