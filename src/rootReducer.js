const mode = localStorage.getItem('mode')

export const initialState = {
    user: null,
    page: 'https://www.facebook.com/plugins/page.php?href=https://https://www.facebook.com/Javascript&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
    darkMode: mode
}

const set_user = 'SET_USER'
const set_page = 'SET_PAGE'
const set_dark_mode = 'SET_DARK_MODE'

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
            default:
                return state;
    }
}
export {set_user, set_page, set_dark_mode}

export default rootReducer ;