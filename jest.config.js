module.exports = {
    collectCoverage: true,
    verbose: true,
    setupFiles: ['<rootDir>/test/setup.js'],
    transform: {
        "^.+\\.js$": "<rootDir>/jest-transformer.js"
    }, 
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]   
}
