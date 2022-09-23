const setPropertyOfDarkMode = () => {
    document.documentElement.style.setProperty("--fb-theme-colour-white-header", darkModeColours.header);
    document.documentElement.style.setProperty("--fb-theme-colour-white-posts", darkModeColours.posts);
    document.documentElement.style.setProperty("--fb-theme-colour-textfield", darkModeColours.textField);
    document.documentElement.style.setProperty("--fb-theme-colour-text", darkModeColours.text);
    document.documentElement.style.setProperty("--fb-theme-colour-post-option", darkModeColours.postOption);
    document.documentElement.style.setProperty("--fb-theme-colour-post-border-top", darkModeColours.postBorderTop);
    document.documentElement.style.setProperty("--fb-theme-colour-messenger-sender-border-top", darkModeColours.messageBorderTop);
    document.documentElement.style.setProperty("--fb-theme-colour-post-text", darkModeColours.postText);
    document.documentElement.style.setProperty("--fb-theme-colour-arrow", darkModeColours.arrow);
    document.documentElement.style.setProperty("--fb-theme-colour-storyreel", darkModeColours.storyReel);
    document.documentElement.style.setProperty("--fb-theme-colour-background", darkModeColours.background);
    document.documentElement.style.setProperty("--fb-theme-colour-chat-toolbar", darkModeColours.chatToolbar);
}
    
const darkModeColours = {
    background : '#18191a',
    storyReel : '#a29b9f',
    arrow : '#a29b9f',
    postText : '#a29b9f',
    messageBorderTop : '#333236',
    postBorderTop : '#333236',
    postOption : '#a29b9f',
    text : '#a29b9f',
    textField : '#444148',
    posts : '#2a292e',
    header : '#2a292e',
    chatToolbar : '#393b40'
}
    
export default setPropertyOfDarkMode;