import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService = {
    create: () => {
      return {
        username: 'ThanhDo',
        email: 'thanh.do@gmail.com',
        password: 'password',
        firstName: 'Thanh',
        lastName: 'Do',
        role: 'User',
        id: '1',
      };
    },
    findAll: () => {
      return [
        {
          username: 'ThanhDo',
          email: 'thanh.do@gmail.com',
          password: 'password',
          firstName: 'Thanh',
          lastName: 'Do',
          role: 'User',
          id: '1',
        },
      ];
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userService.findAll);
  });

  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'ThanhDo',
        email: 'thanh.do@gmail.com',
        password: 'password',
        firstName: 'Thanh',
        lastName: 'Do',
        role: 'User',
        id: '1',
      })
      .expect(201)
      .expect(userService.create);
  });
});
