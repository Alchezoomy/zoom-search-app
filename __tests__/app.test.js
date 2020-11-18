require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    test('returns todo', async () => {

      const expectation = [
        {
          'id': 4,
          'todo': 'bessie',
          'completed': false,
          'owner_id': 2
        },
        {
          'id': 5,
          'todo': 'jumpy',
          'completed': false,
          'owner_id': 2
        },
        {
          'id': 6,
          'todo': 'spot',
          'completed': false,
          'owner_id': 2
        }
      ];

      await fakeRequest(app)
        .post('/api/todo')
        .send(expectation[0])
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      await fakeRequest(app)
        .post('/api/todo')
        .send(expectation[1])
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      await fakeRequest(app)
        .post('/api/todo')
        .send(expectation[2])
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      const data = await fakeRequest(app)
        .get('/api/todo')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    test('returns todo', async () => {

      const expectation = [
        {
          'id': 7,
          'todo': 'bessie',
          'completed': false,
          'owner_id': 2
        },

      ];

      const data = await fakeRequest(app)
        .post('/api/todo')
        .send(expectation[0])
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    test('returns todo', async () => {

      const expectation = [
        {
          'id': 7,
          'todo': 'bessie',
          'completed': true,
          'owner_id': 2
        },
      ]
      const input = [
        {
          'id': 7,
          'todo': 'bessie',
          'completed': false,
          'owner_id': 2
        },

      ];

      const data = await fakeRequest(app)
        .put('/api/todo/7')
        .send(input[0])
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
