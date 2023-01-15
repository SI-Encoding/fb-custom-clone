const setPropertyOfLightMode = () => {
    lightModeColours.map((lightColours) => document.documentElement.style.setProperty(lightColours.cssVariable, lightColours.hexColourCode));
}
    
const lightModeColours = [
    {hexColourCode : '#f1f2f5', cssVariable: "--fb-theme-colour-background"},
    {hexColourCode : '#2e81f4', cssVariable: "--fb-theme-colour-storyreel"},
    {hexColourCode : 'rgba(0, 0, 0, 0.54)', cssVariable: "--fb-theme-colour-arrow"},
    {hexColourCode : '#000000', cssVariable: "--fb-theme-colour-post-text"},
    {hexColourCode : '#eff2f5', cssVariable: "--fb-theme-colour-messenger-sender-border-top"},
    {hexColourCode : 'lightgray', cssVariable: "--fb-theme-colour-post-border-top"},
    {hexColourCode :'gray', cssVariable: "--fb-theme-colour-post-option"},
    {hexColourCode : '#000000', cssVariable: "--fb-theme-colour-text"},
    {hexColourCode : '#eff2f5', cssVariable: "--fb-theme-colour-textfield"},
    {hexColourCode : 'white', cssVariable: "--fb-theme-colour-white-posts"},
    {hexColourCode : 'white', cssVariable: "--fb-theme-colour-white-header"},
    {hexColourCode : 'royalblue', cssVariable: "--fb-theme-colour-chat-toolbar"}
]

export default setPropertyOfLightMode;