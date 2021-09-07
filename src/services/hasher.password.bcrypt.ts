import { inject } from '@loopback/core';
import {genSalt, hash,compare}from 'bcryptjs';
import { PasswordHasherBinding } from '../keys';


// eslint-disable-next-line @typescript-eslint/naming-convention
export interface passwordHasher <T = string> {
    hashPasword(password: T) : Promise<T>;
    comparePassword(providePass: T, storedPass:T): Promise<boolean>
}

export class BcryptHasher implements passwordHasher<string>{
async comparePassword(providePass: string, storedPass: string): Promise<boolean> {
   const passwordMatched = await compare(providePass,storedPass);
   return passwordMatched;
}

@inject(PasswordHasherBinding.ROUNDS)
public readonly rounds:number;

async hashPasword(password: string){
const salt = await genSalt(this.rounds);

return hash(password, salt);
}

}
