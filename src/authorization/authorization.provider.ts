import {
    AuthorizationContext,
    AuthorizationDecision,
    AuthorizationMetadata,
    Authorizer,
  } from '@loopback/authorization';
  import {Provider} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {UserRepository} from '../repositories/user.repository';
  export class MyAuthorizationProvider implements Provider<Authorizer> {
    constructor(
      @repository(UserRepository)
      public userRepository: UserRepository,
    ) {}
    value(): Authorizer {
      return this.authorize.bind(this);
    }
    async authorize(
      authorizationCtx: AuthorizationContext,
      metadata: AuthorizationMetadata,
    ) {
      console.log(authorizationCtx.principals[0]);
      const id = authorizationCtx.principals[0].id;
      const roleValue = await this.userRepository.role(id);
      const actualRole = roleValue['name'].toString();
      const allowedRoles: string[] = metadata.allowedRoles;
      console.log(actualRole);
      console.log(allowedRoles);
      return allowedRoles.includes(actualRole)
        ? AuthorizationDecision.ALLOW
        : AuthorizationDecision.DENY;
    }
  }