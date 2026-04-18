const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, 'themes');

// Read an existing theme to use as tokenColors template
const templatePath = path.join(themesDir, 'Farzetki DarkBlue Theme color-theme.json');
const templateContent = fs.readFileSync(templatePath, 'utf8');
const stripComments = str => str.replace(/\/\/.*$/gm, '');
const templateData = JSON.parse(stripComments(templateContent));

function buildTheme(name, colors, tokenMap) {
    const data = { name, colors, tokenColors: JSON.parse(JSON.stringify(templateData.tokenColors)) };

    data.tokenColors = data.tokenColors.map(tc => {
        if (!tc.settings) return tc;
        let newColor = tokenMap.text;
        const n = (tc.name || '').toLowerCase();
        const s = JSON.stringify(tc.scope || '').toLowerCase();

        if (n.includes('comment') || s.includes('comment')) newColor = tokenMap.comment;
        else if (n.includes('string') || s.includes('string')) newColor = tokenMap.strings;
        else if (n.includes('function') || n.includes('method') || s.includes('function')) newColor = tokenMap.functions;
        else if (n.includes('keyword') || n.includes('storage') || n.includes('tag') || s.includes('keyword')) newColor = tokenMap.keywords;
        else if (n.includes('variable') || n.includes('parameter') || s.includes('variable')) newColor = tokenMap.variables;
        else if (n.includes('number') || n.includes('constant') || s.includes('constant')) newColor = tokenMap.numbers;

        if (tc.settings.foreground) tc.settings.foreground = newColor;
        return tc;
    });

    return data;
}

// ==================== FARZETKI DARK THEME (VS Code Dark+ Clone) ====================
const darkColors = {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "activityBar.background": "#333333",
    "sideBar.background": "#252526",
    "statusBar.background": "#007acc",
    "tab.activeBackground": "#1e1e1e",
    "titleBar.activeBackground": "#3c3c3c",
    "titleBar.inactiveBackground": "#3c3c3c",
    "titleBar.activeForeground": "#cccccc",
    "statusBar.noFolderBackground": "#68217a",
    "statusBar.debuggingBackground": "#cc6633",
    "statusBar.foreground": "#ffffff",
    "activityBar.foreground": "#ffffff",
    "activityBar.inactiveForeground": "#ffffff99",
    "activityBar.activeBorder": "#ffffff",
    "activityBarBadge.background": "#007acc",
    "activityBarBadge.foreground": "#ffffff",
    "menu.background": "#252526",
    "menu.foreground": "#cccccc",
    "menu.selectionBackground": "#04395e",
    "menu.selectionForeground": "#ffffff",
    "menu.separatorBackground": "#454545",
    "menubar.selectionBackground": "#ffffff1a",
    "menubar.selectionForeground": "#cccccc",
    "foreground": "#cccccc",
    "descriptionForeground": "#9e9e9e",
    "settings.headerForeground": "#e7e7e7",
    "settings.modifiedItemIndicator": "#0c7d9d",
    "editorGroupHeader.tabsBackground": "#252526",
    "tab.inactiveBackground": "#2d2d2d",
    "tab.inactiveForeground": "#ffffff80",
    "list.activeSelectionBackground": "#04395e",
    "list.activeSelectionForeground": "#ffffff",
    "list.inactiveSelectionBackground": "#37373d",
    "list.inactiveSelectionForeground": "#cccccc",
    "list.hoverBackground": "#2a2d2e",
    "list.hoverForeground": "#cccccc",
    "input.background": "#3c3c3c",
    "input.foreground": "#cccccc",
    "input.placeholderForeground": "#a6a6a6",
    "input.border": "#3c3c3c",
    "editorWidget.background": "#252526",
    "editorWidget.border": "#454545",
    "panel.background": "#1e1e1e",
    "button.background": "#0e639c",
    "button.foreground": "#ffffff",
    "button.hoverBackground": "#1177bb",
    "dropdown.background": "#3c3c3c",
    "dropdown.foreground": "#cccccc",
    "dropdown.border": "#3c3c3c",
    "editorLineNumber.foreground": "#858585",
    "editorLineNumber.activeForeground": "#c6c6c6",
    "scrollbarSlider.background": "#79797966",
    "scrollbarSlider.hoverBackground": "#646464b3",
    "scrollbarSlider.activeBackground": "#bfbfbf66",
    "editorSuggestWidget.background": "#252526",
    "editorSuggestWidget.selectedBackground": "#04395e",
    "editorSuggestWidget.foreground": "#d4d4d4",
    "editorSuggestWidget.border": "#454545",
    "terminal.background": "#1e1e1e",
    "terminal.foreground": "#cccccc",
    "gitDecoration.modifiedResourceForeground": "#e2c08d",
    "gitDecoration.untrackedResourceForeground": "#73c991",
    "gitDecoration.deletedResourceForeground": "#c74e39",
    "editor.selectionBackground": "#264f78",
    "editor.selectionHighlightBackground": "#add6ff26",
    "editor.inactiveSelectionBackground": "#3a3d41"
};
const darkTokens = {
    text: '#d4d4d4', comment: '#6a9955', strings: '#ce9178',
    functions: '#dcdcaa', keywords: '#569cd6', variables: '#9cdcfe', numbers: '#b5cea8'
};

// ==================== FARZETKI LIGHT THEME (VS Code Light+ Clone) ====================
const lightColors = {
    "editor.background": "#ffffff",
    "editor.foreground": "#000000",
    "activityBar.background": "#2c2c2c",
    "sideBar.background": "#f3f3f3",
    "statusBar.background": "#007acc",
    "tab.activeBackground": "#ffffff",
    "titleBar.activeBackground": "#dddddd",
    "titleBar.inactiveBackground": "#dddddd",
    "titleBar.activeForeground": "#333333",
    "statusBar.noFolderBackground": "#68217a",
    "statusBar.debuggingBackground": "#cc6633",
    "statusBar.foreground": "#ffffff",
    "activityBar.foreground": "#ffffff",
    "activityBar.inactiveForeground": "#ffffff99",
    "activityBar.activeBorder": "#ffffff",
    "activityBarBadge.background": "#007acc",
    "activityBarBadge.foreground": "#ffffff",
    "menu.background": "#ffffff",
    "menu.foreground": "#616161",
    "menu.selectionBackground": "#0060c0",
    "menu.selectionForeground": "#ffffff",
    "menu.separatorBackground": "#d4d4d4",
    "menubar.selectionBackground": "#0000001a",
    "menubar.selectionForeground": "#333333",
    "foreground": "#333333",
    "descriptionForeground": "#717171",
    "settings.headerForeground": "#444444",
    "settings.modifiedItemIndicator": "#0c7d9d",
    "editorGroupHeader.tabsBackground": "#f3f3f3",
    "tab.inactiveBackground": "#ececec",
    "tab.inactiveForeground": "#33333380",
    "list.activeSelectionBackground": "#0060c0",
    "list.activeSelectionForeground": "#ffffff",
    "list.inactiveSelectionBackground": "#e4e6f1",
    "list.inactiveSelectionForeground": "#333333",
    "list.hoverBackground": "#e8e8e8",
    "list.hoverForeground": "#333333",
    "input.background": "#ffffff",
    "input.foreground": "#333333",
    "input.placeholderForeground": "#a6a6a6",
    "input.border": "#cecece",
    "editorWidget.background": "#f3f3f3",
    "editorWidget.border": "#c8c8c8",
    "panel.background": "#ffffff",
    "button.background": "#007acc",
    "button.foreground": "#ffffff",
    "button.hoverBackground": "#0062a3",
    "dropdown.background": "#ffffff",
    "dropdown.foreground": "#333333",
    "dropdown.border": "#cecece",
    "editorLineNumber.foreground": "#237893",
    "editorLineNumber.activeForeground": "#0b216f",
    "scrollbarSlider.background": "#64646466",
    "scrollbarSlider.hoverBackground": "#646464b3",
    "scrollbarSlider.activeBackground": "#00000099",
    "editorSuggestWidget.background": "#f3f3f3",
    "editorSuggestWidget.selectedBackground": "#0060c0",
    "editorSuggestWidget.foreground": "#333333",
    "editorSuggestWidget.border": "#c8c8c8",
    "terminal.background": "#ffffff",
    "terminal.foreground": "#333333",
    "gitDecoration.modifiedResourceForeground": "#895503",
    "gitDecoration.untrackedResourceForeground": "#007100",
    "gitDecoration.deletedResourceForeground": "#ad0707",
    "editor.selectionBackground": "#add6ff",
    "editor.selectionHighlightBackground": "#add6ff80",
    "editor.inactiveSelectionBackground": "#e5ebf1"
};
const lightTokens = {
    text: '#000000', comment: '#008000', strings: '#a31515',
    functions: '#795e26', keywords: '#0000ff', variables: '#001080', numbers: '#098658'
};

// Build and write both themes
const darkTheme = buildTheme('Farzetki Dark Theme', darkColors, darkTokens);
fs.writeFileSync(path.join(themesDir, 'Farzetki Dark Theme color-theme.json'), JSON.stringify(darkTheme, null, '\t'), 'utf8');

const lightTheme = buildTheme('Farzetki Light Theme', lightColors, lightTokens);
fs.writeFileSync(path.join(themesDir, 'Farzetki Light Theme color-theme.json'), JSON.stringify(lightTheme, null, '\t'), 'utf8');

console.log("Dark Theme + Light Theme created successfully!");
