export const CAP_NHAT_EMAIL='CAP_NHAT_EMAIL';
export const CAP_NHAT_SCORE ='CAP_NHAT_SCORE';
export const CAP_NHAT_IMAGE = 'CAP_NHAT_IMAGE';
export const CAP_NHAT_UID = 'CAP_NHAT_UID';


const initalState ={
    email:'',
    score:0,
    image:'https://wallpaperaccess.com/full/2159447.jpg',
    uid:'',
}

export default function actionForReducer(state= initalState, payload){
    switch(payload.type){
        case CAP_NHAT_EMAIL:
            return{
                ...state,
                email: payload.email
            }
        case CAP_NHAT_SCORE:
            return{
                ...state,
                score: payload.score
            }
        case CAP_NHAT_IMAGE:
            return{
                ...state,
                image: payload.image
            }
        case CAP_NHAT_UID:
                return{
                    ...state,
                    uid: payload.uid
                }
            default : return state
            
    }
}