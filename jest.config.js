module.exports = {
    collectCoverage: true,
    setupFiles: ['<rootDir>/test/setup.js'],
    transform: {
        "^.+\\.js$": "<rootDir>/jest-transformer.js"
    }, 
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
    verbose: true,    
    
}
