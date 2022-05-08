export const initialState = {
    user: null,
    page: 'https://www.facebook.com/plugins/page.php?href=https://https://www.facebook.com/Javascript&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
}

const set_user = 'SET_USER'
const set_page = 'SET_PAGE'

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
            default:
                return state;
    }
}
export {set_user, set_page}

export default rootReducer ;