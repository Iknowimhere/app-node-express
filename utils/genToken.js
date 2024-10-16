import jwt from 'jsonwebtoken';

export async function genToken(id){
    return await jwt.sign({id:id},"Topsecret",{
        expiresIn:'1d'
    })
}
