/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'bakibillahrahat@gmail.com',
      password: '1234',
    };
    describe('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signup',
          )
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should signin');
    });
  });

  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
  });
});
