const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'OPENAI_API_KEY.env');
const destFile = path.join(__dirname, '.env');

console.log(`Copying:\nFrom: ${sourceFile}\nTo: ${destFile}`);

try {
    // Check if source exists
    if (!fs.existsSync(sourceFile)) {
        throw new Error(`Source file not found: ${sourceFile}\nDirectory contents: ${fs.readdirSync(__dirname)}`);
    }
    
    fs.copyFileSync(sourceFile, destFile);
    console.log('✅ Environment file copied successfully');
} catch (err) {
    console.error('❌ Failed to copy environment file:', err.message);
    process.exit(1);
}