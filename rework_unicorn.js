const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'themes', 'Farzetki Unicorn Theme color-theme.json');
if (!fs.existsSync(p)) process.exit(1);

let content = fs.readFileSync(p, 'utf8');
const stripComments = str => str.replace(/\/\/.*$/gm, '');
const data = JSON.parse(stripComments(content));

// DARK PINK Palette — koyu arka plan, pembe vurgular, sıfır cyan/mor
const bg = '#1a0a12';           // Çok koyu bordo-pembe
const secondaryBg = '#261420';  // Biraz daha açık koyu pembe
const activeBg = '#33192b';     // Aktif tab vs.
const fg = '#f5d5e0';           // Açık pembe-beyaz yazı
const accent = '#ff69b4';       // Hot Pink — ana vurgu rengi
const accentBright = '#ff1493'; // Deep Pink — parlak vurgu
const muted = '#8c5070';        // Soluk pembe — pasif elemanlar
const softPink = '#ffb6c1';     // Light Pink — soft yazılar

// Token renkleri — hepsi pembe ailesi, cyan yok
const comment = '#6b3a50';      // Koyu soluk pembe yorum
const strings = '#ffb6c1';      // Light pink stringler
const functions = '#ff69b4';    // Hot pink fonksiyonlar
const keywords = '#ff1493';     // Deep pink keywordler
const variables = '#f08080';    // Light coral değişkenler
const numbers = '#dda0dd';      // Plum — sayılar (hafif lavanta-pembe)

data.colors = {
    "editor.background": bg,
    "editor.foreground": fg,
    "activityBar.background": secondaryBg,
    "sideBar.background": secondaryBg,
    "statusBar.background": "#4d1533",
    "tab.activeBackground": activeBg,
    "titleBar.activeBackground": bg,
    "titleBar.inactiveBackground": "#120710",
    "titleBar.activeForeground": accent,
    "statusBar.noFolderBackground": secondaryBg,
    "statusBar.debuggingBackground": accentBright,
    "statusBar.foreground": fg,
    "activityBar.foreground": accent,
    "activityBar.inactiveForeground": muted,
    "activityBar.activeBorder": accent,
    "activityBarBadge.background": accentBright,
    "activityBarBadge.foreground": "#ffffff",
    "menu.background": secondaryBg,
    "menu.foreground": accent,
    "menu.selectionBackground": accentBright,
    "menu.selectionForeground": "#ffffff",
    "menu.separatorBackground": muted,
    "menubar.selectionBackground": secondaryBg,
    "menubar.selectionForeground": accent,
    "foreground": fg,
    "descriptionForeground": muted,
    "settings.headerForeground": accent,
    "settings.modifiedItemIndicator": accentBright,
    "editorGroupHeader.tabsBackground": bg,
    "tab.inactiveBackground": secondaryBg,
    "tab.inactiveForeground": muted,
    "list.activeSelectionBackground": activeBg,
    "list.activeSelectionForeground": accent,
    "list.inactiveSelectionBackground": secondaryBg,
    "list.inactiveSelectionForeground": fg,
    "list.hoverBackground": "#2e1825",
    "list.hoverForeground": accent,
    "input.background": bg,
    "input.foreground": fg,
    "input.placeholderForeground": muted,
    "input.border": accent,
    "editorWidget.background": secondaryBg,
    "editorWidget.border": activeBg,
    "panel.background": bg,
    "editorCursor.foreground": accentBright,
    "button.background": accent,
    "button.foreground": bg,
    "button.hoverBackground": accentBright,
    "dropdown.background": secondaryBg,
    "dropdown.foreground": fg,
    "dropdown.border": accent,
    "editorLineNumber.foreground": muted,
    "editorLineNumber.activeForeground": accent,
    "scrollbarSlider.background": "#ff69b430",
    "scrollbarSlider.hoverBackground": "#ff69b460",
    "scrollbarSlider.activeBackground": "#ff69b490",
    "editorSuggestWidget.background": secondaryBg,
    "editorSuggestWidget.selectedBackground": activeBg,
    "editorSuggestWidget.foreground": fg,
    "editorSuggestWidget.border": accent,
    "terminal.background": bg,
    "terminal.foreground": fg,
    "gitDecoration.modifiedResourceForeground": softPink,
    "gitDecoration.untrackedResourceForeground": numbers,
    "gitDecoration.deletedResourceForeground": accentBright,
    "editor.selectionBackground": "#ff69b440",
    "editor.selectionHighlightBackground": "#ff69b420",
    "editor.inactiveSelectionBackground": "#ff69b420"
};

data.tokenColors = data.tokenColors.map(tc => {
    if (!tc.settings) return tc;
    let newColor = fg;
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

fs.writeFileSync(p, JSON.stringify(data, null, '\t'), 'utf8');
console.log("Unicorn reworked to DARK PINK!");
