import { CAP_NHAT_EMAIL,CAP_NHAT_SCORE,CAP_NHAT_IMAGE,CAP_NHAT_UID } from "../reducers/infoReducer";

export const updateEmail = (email) => async dispatch =>{
    try {
        await console.log('goi len server');
        // await new Promise((resolve,reject)=>{
        //     setTimeout(() => {
        //        resolve() 
        //     }, 3000);    // tao thoi gian delay

        // });
         await console.log('da cap nhat')
        dispatch({
            type: CAP_NHAT_EMAIL,
            email: email

    })
}catch(error){

}
}

export const updateScore = (score) => async dispatch =>{
    try {
        await console.log('goi len server');
        // await new Promise((resolve,reject)=>{
        //     setTimeout(() => {
        //        resolve() 
        //     }, 3000);    // tao thoi gian delay

        // });
         await console.log('da cap nhat')
        dispatch({
            type: CAP_NHAT_SCORE,
           score: score

    })
}catch(error){

}
}

export const updateImage = (image) => async dispatch =>{
    try {
        await console.log('goi len server');
        // await new Promise((resolve,reject)=>{
        //     setTimeout(() => {
        //        resolve() 
        //     }, 3000);    // tao thoi gian delay

        // });
         await console.log('da cap nhat')
        dispatch({
            type: CAP_NHAT_IMAGE,
            image:image

    })
}catch(error){

}
}

export const updateUid = (uid) => async dispatch =>{
    try {
        await console.log('goi len server');
        // await new Promise((resolve,reject)=>{
        //     setTimeout(() => {
        //        resolve() 
        //     }, 3000);    // tao thoi gian delay

        // });
         await console.log('da cap nhat')
        dispatch({
            type: CAP_NHAT_UID,
            uid:uid

    })
}catch(error){

}
}