import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'I am signed up.' };
  }

  signin() {
    { msg: 'I am signed up.' }
  }
}

const service = new AuthService();
