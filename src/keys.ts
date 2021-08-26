import { UserService } from "@loopback/authentication";
import { BindingKey } from "@loopback/core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "./models/user.model";
import { Credentials } from "./repositories/user.repository";
import { passwordHasher } from "./services/hasher.password.bcrypt";
import { JWTService } from "./services/jwt-service";


export namespace TokenServiceConstants {
    export const TOKEN_SECRET_VALUE='123asdf';
    export const TOKEN_EXPIRES_IN_VALUE='7h';
}

export namespace TokenServiceBindings {
    export const TOKEN_SECRET =BindingKey.create<string>('authentication.jwt.secret');
    export const TOKEN_EXPIRES_IN =BindingKey.create<string>('authentication.jwt.expiresIn');
    export const TOKEN_SERVICE =BindingKey.create<JWTService>('services.jwt.service');



}

export namespace PasswordHasherBinding{
    export const PASSWORD_HASHER = BindingKey.create<passwordHasher>(
  'service.hasher'
    );

    export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace UserServiceBindings{
    export const USER_SERVICE =BindingKey.create<UserService<Credentials,User>>(
        'services.user.service'
    )
}
