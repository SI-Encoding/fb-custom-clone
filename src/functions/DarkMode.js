const setPropertyOfDarkMode = () => {
    darkModeColours.map((darkColours) => document.documentElement.style.setProperty(darkColours.cssVariable, darkColours.hexColourCode));
}

const darkModeColours = [
    {hexColourCode : '#18191a', cssVariable: "--fb-theme-colour-background"},
    {hexColourCode : '#a29b9f', cssVariable: "--fb-theme-colour-storyreel"},
    {hexColourCode : '#a29b9f', cssVariable: "--fb-theme-colour-arrow"},
    {hexColourCode : '#a29b9f', cssVariable: "--fb-theme-colour-post-text"},
    {hexColourCode : '#333236', cssVariable: "--fb-theme-colour-messenger-sender-border-top"},
    {hexColourCode : '#333236', cssVariable: "--fb-theme-colour-post-border-top"},
    {hexColourCode : '#a29b9f', cssVariable: "--fb-theme-colour-post-option"},
    {hexColourCode : '#a29b9f', cssVariable: "--fb-theme-colour-text"},
    {hexColourCode : '#444148', cssVariable: "--fb-theme-colour-textfield"},
    {hexColourCode : '#2a292e', cssVariable: "--fb-theme-colour-white-posts"},
    {hexColourCode : '#2a292e', cssVariable: "--fb-theme-colour-white-header"},
    {hexColourCode : '#393b40', cssVariable: "--fb-theme-colour-chat-toolbar"}
]
        
export default setPropertyOfDarkMode;