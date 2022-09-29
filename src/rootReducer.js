const mode = localStorage.getItem('mode')

export const initialState = {
    user: null,
    page: 
    { src:'https://www.facebook.com/plugins/page.php?href=https://https://www.facebook.com/Javascript&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
      title: 'Javascript'
    },
    darkMode: mode,
    chatUserInfo: null
}

const set_user = 'SET_USER'
const set_page = 'SET_PAGE'
const set_dark_mode = 'SET_DARK_MODE'
const set_chat_user_info = 'SET_CHAT_USER_INFO'

const rootReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user:action.user,
            }
        case 'SET_PAGE':
            return {
                ...state,
                page:action.page,
            }
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode:action.darkMode,
            }
        case 'SET_CHAT_USER_INFO':
            return {
                ...state,
                chatUserInfo:action.chatUserInfo,
            }
            default:
                return state;
    }
}
export {set_user, set_page, set_dark_mode, set_chat_user_info}

export default rootReducer ;