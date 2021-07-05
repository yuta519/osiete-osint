import { FETCH_OSINTS, SEARCH_OSINT } from "../actions/osintAction"


export default(state = {'aaa': 'bbb'}, action) => {
    switch (action.type) {
        case FETCH_OSINTS:
            return state
        case SEARCH_OSINT:
            return state
        default:
            return state
    }
}