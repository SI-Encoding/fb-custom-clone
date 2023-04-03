const mode = localStorage.getItem('mode')

export const initialState = {
    user: null,
    page: 
    { src:'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fhttps%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
      title: 'Facebook'
    },
    darkMode: mode,
    chatUserInfo: null,
    video: {status: false, remoteId: ''}
}

const set_user = 'SET_USER'
const set_page = 'SET_PAGE'
const set_dark_mode = 'SET_DARK_MODE'
const set_chat_user_info = 'SET_CHAT_USER_INFO'
const set_video_mode = 'SET_VIDEO_MODE'

const rootReducer = (state = initialState, action) => {
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
        case 'SET_VIDEO_MODE':
            return {
                ...state,
                video:action.video,
            }    
            default:
                return state;
    }
}
export {set_user, set_page, set_dark_mode, set_chat_user_info, set_video_mode}

export default rootReducer ;