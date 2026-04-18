const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, 'themes');

// Helper to convert hex to rgba-like slightly transparent (vs code uses hex + alpha channel)
const addAlpha = (hex, opacityHex = '80') => hex.substring(0, 7) + opacityHex;

function processTheme(filename, text, comment, strings, functions, keywords, variables, numbers, bg, fg, secondaryBg, accent) {
    const p = path.join(themesDir, filename);
    if (!fs.existsSync(p)) return;
    
    let content = fs.readFileSync(p, 'utf8');
    
    const tokenColorsIndex = content.indexOf('"tokenColors"');
    if (tokenColorsIndex === -1) return;
    
    let head = content.slice(0, tokenColorsIndex);
    
    const stripComments = str => str.replace(/\/\/.*$/gm, '');
    const data = JSON.parse(stripComments(content));
    
    // 1. UPDATE TOKEN COLORS
    data.tokenColors = data.tokenColors.map(tc => {
        if (!tc.settings) return tc;
        let newColor = text;
        const name = (tc.name || '').toLowerCase();
        const scopeStr = JSON.stringify(tc.scope || '').toLowerCase();
        
        if (name.includes('comment') || scopeStr.includes('comment')) newColor = comment;
        else if (name.includes('string') || scopeStr.includes('string')) newColor = strings;
        else if (name.includes('function') || name.includes('method') || scopeStr.includes('function')) newColor = functions;
        else if (name.includes('keyword') || name.includes('storage') || name.includes('tag') || scopeStr.includes('keyword')) newColor = keywords;
        else if (name.includes('variable') || name.includes('parameter') || scopeStr.includes('variable')) newColor = variables;
        else if (name.includes('number') || name.includes('constant') || scopeStr.includes('constant')) newColor = numbers;
        
        if (tc.settings.foreground) {
            tc.settings.foreground = newColor;
        }
        return tc;
    });

    // 2. ENHANCE UI COLORS (We'll safely merge these to data.colors and then reconstruct the head to avoid losing comments)
    // Actually, reconstructing the head with new keys while preserving old comments is extremely hard with simple JSON.parse
    // Instead, string replacement or just let JSON stringify handle the colors block. But user wants to keep the comments in colors!
    // Alternatively, we inject it into the raw JSON string before "tokenColors"
    
    const newKeys = {
        "button.background": accent,
        "button.foreground": bg,
        "button.hoverBackground": text,
        "dropdown.background": secondaryBg,
        "dropdown.foreground": fg,
        "dropdown.border": accent,
        "editorLineNumber.foreground": comment,
        "editorLineNumber.activeForeground": accent,
        "scrollbarSlider.background": addAlpha(accent, '30'),
        "scrollbarSlider.hoverBackground": addAlpha(accent, '60'),
        "scrollbarSlider.activeBackground": addAlpha(accent, '90'),
        "editorSuggestWidget.background": secondaryBg,
        "editorSuggestWidget.selectedBackground": accent,
        "editorSuggestWidget.foreground": fg,
        "editorSuggestWidget.border": accent,
        "terminal.background": bg,
        "terminal.foreground": fg,
        "gitDecoration.modifiedResourceForeground": strings, // Using strings color or variables as yellow/blue
        "gitDecoration.untrackedResourceForeground": numbers, // Using numbers/cyan as green/new
        "gitDecoration.deletedResourceForeground": functions // Just unique colors in the palette
    };

    // Find where the colors object ends in the `head` string. 
    // It's usually `},\n\t"tokenColors"`
    // We will append our newKeys right before the end of the colors object brace
    
    let injectedColorsStr = "";
    for (let key in newKeys) {
        injectedColorsStr += `\t\t"${key}": "${newKeys[key]}",\n`;
    }
    
    // Inject at the bottom of the colors object
    // Find the last "}," before tokenColorsIndex
    const lastBraceIndex = head.lastIndexOf('},');
    if (lastBraceIndex !== -1) {
        head = head.substring(0, lastBraceIndex) + ",\n" + injectedColorsStr + head.substring(lastBraceIndex);
    }

    const newTail = '"tokenColors": ' + JSON.stringify(data.tokenColors, null, '\t').replace(/\n/g, '\n\t').slice(0, -1) + ']\n}';
    
    fs.writeFileSync(p, head + newTail, 'utf8');
}

// params: filename, text, comment, strings, functions, keywords, variables, numbers, bg, fg, secondaryBg, accent
processTheme('Farzetki MatrixGreen Theme color-theme.json', '#b4e6b4', '#4a7a4a', '#aaffaa', '#88ff88', '#00ff41', '#b4e6b4', '#ccffcc', '#0a120a', '#b4e6b4', '#0f1a0f', '#00ff41');
processTheme('Farzetki BloodMoon  Theme color-theme.json', '#ffb3b3', '#8c4444', '#ff7777', '#ff5555', '#ff2a2a', '#ff9999', '#ffaa00', '#120808', '#ffb3b3', '#1c0d0d', '#ff2a2a');
processTheme('Farzetki Unicorn Theme color-theme.json', '#ffe4e1', '#ae81bd', '#ffb6c1', '#ff1493', '#dda0dd', '#ff69b4', '#00ffff', '#1e112a', '#ffe4e1', '#2c1b3d', '#ff1493');
processTheme('Farzetki DarkBlue Theme color-theme.json', '#b4cce6', '#698cb5', '#b4cce6', '#00aaff', '#0088cc', '#88ccff', '#ade1ff', '#082847', '#00ffff', '#1d2247', '#00ffff');

console.log("Syntax Colors & ADVANCED UI Successfully Updated!");
