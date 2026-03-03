const fs = require('fs');
const path = require('path');

const cssDir = path.resolve(__dirname, '..');

const replacements = {
    // Colors
    '--color-bg-primary': '--bg-base',
    '--color-bg-secondary': '--bg-surface',
    '--color-bg-tertiary': '--bg-elevated',
    '--color-bg-elevated': '--bg-elevated',

    '--color-surface-glass': '--glass-bg',
    '--color-surface-glass-hover': '--glass-bg',
    '--color-surface-glass-active': '--glass-bg',

    '--color-border-subtle': '--border-subtle',
    '--color-border-default': '--border-base',
    '--color-border-strong': '--border-hover',
    '--color-border-accent': '--action-primary',

    '--color-text-primary': '--text-primary',
    '--color-text-secondary': '--text-secondary',
    '--color-text-tertiary': '--text-tertiary',
    '--color-text-disabled': '--n-400',
    '--color-text-inverse': '--text-inverse',

    '--color-accent-primary': '--action-primary',
    '--color-accent-hover': '--action-hover',
    '--color-accent-pressed': '--action-active',
    '--color-success': '--success-500',
    '--color-danger': '--danger-500',
    '--color-warning': '--warning-500',
    '--color-info': '--p-500',

    // Typography 
    '--font-body': '--font-sans',
    '--font-heading': '--font-sans',
    '--font-xs': '--text-xs',
    '--font-sm': '--text-sm',
    '--font-base': '--text-base',
    '--font-md': '--text-lg',
    '--font-lg': '--text-xl',
    '--font-xl': '--text-2xl',
    '--font-2xl': '--text-3xl',
    '--font-3xl': '--text-4xl',
    '--font-4xl': '--text-4xl',
    '--font-5xl': '--text-4xl',

    '--leading-none': '--line-height-tight',
    '--leading-tight': '--line-height-tight',
    '--leading-snug': '--line-height-tight',
    '--leading-normal': '--line-height-base',
    '--leading-relaxed': '--line-height-base',
    '--leading-loose': '--line-height-loose'
};

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.css') && !fullPath.includes('tokens')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            for (const [oldToken, newToken] of Object.entries(replacements)) {
                // Find exact map like var(--color-bg-primary) and replace with var(--bg-base)
                const regex = new RegExp(`var\\(\\s*${oldToken}\\s*\\)`, 'g');
                updated = updated.replace(regex, `var(${newToken})`);
            }
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated tokens in: ${fullPath}`);
            }
        }
    });
}

processDirectory(cssDir);
console.log('Migration complete!');
