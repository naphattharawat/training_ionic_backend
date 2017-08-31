import * as jwt from 'jsonwebtoken';
export class Jwt {
  key = '12345';

  sign(payload: any) {
    const token = jwt.sign(payload, this.key, {
      expiresIn: '1d'
    })
    return token;
  }
  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.key, (error, decoded) => {
        if (error) { 
          reject('access denied') ;
        }
        else {
          resolve(decoded);
        }
      })
    })
  }
}