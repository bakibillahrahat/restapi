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
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signup',
          )
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signup',
          )
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signup',
          )
          .expectStatus(400);
      });

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
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signin',
          )
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signin',
          )
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post(
            'http://localhost:3333/auth/signin',
          )
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Rahat $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      
    });
    describe('Get bookmarks', () => {
      it('should get current bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks/id')
      })
    });
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark by id', () => {});
    describe('Delete bookmark by id', () => {});
  });
});
