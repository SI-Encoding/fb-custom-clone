function setPropertyOfLightMode() {
    document.documentElement.style.setProperty("--fb-theme-colour-white-header", lightModeColours.header);
    document.documentElement.style.setProperty("--fb-theme-colour-white-posts", lightModeColours.posts);
    document.documentElement.style.setProperty("--fb-theme-colour-textfield", lightModeColours.textField);
    document.documentElement.style.setProperty("--fb-theme-colour-text", lightModeColours.text);
    document.documentElement.style.setProperty("--fb-theme-colour-post-option", lightModeColours.postOption);
    document.documentElement.style.setProperty("--fb-theme-colour-post-border-top", lightModeColours.postBorderTop);
    document.documentElement.style.setProperty("--fb-theme-colour-messenger-sender-border-top", lightModeColours.messageBorderTop);
    document.documentElement.style.setProperty("--fb-theme-colour-post-text", lightModeColours.postText);
    document.documentElement.style.setProperty("--fb-theme-colour-arrow", lightModeColours.arrow);
    document.documentElement.style.setProperty("--fb-theme-colour-storyreel", lightModeColours.storyReel);
    document.documentElement.style.setProperty("--fb-theme-colour-background", lightModeColours.background);
    document.documentElement.style.setProperty("--fb-theme-colour-chat-toolbar", lightModeColours.chatToolbar);
}
    
const lightModeColours = {
    background : '#f1f2f5',
    storyReel : '#2e81f4',
    arrow : 'rgba(0, 0, 0, 0.54)',
    postText : '#000000',
    messageBorderTop : '#eff2f5',
    postBorderTop : 'lightgray',
    postOption :'gray',
    text : '#000000',
    textField : '#eff2f5',
    posts : 'white',
    header : 'white',
    chatToolbar : 'royalblue'
}
    
export default setPropertyOfLightMode;