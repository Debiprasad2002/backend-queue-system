// test/auth.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    let token;

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'password' });

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

    it('should log in the user', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should fail to access a protected route without a token', async () => {
        const res = await request(app)
            .post('/enqueue')
            .send({ task: 'Sample task' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Access denied');
    });

    it('should enqueue a task with a valid token', async () => {
        const res = await request(app)
            .post('/enqueue')
            .set('Authorization', token)
            .send({ task: 'Sample task' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Task enqueued successfully');
    });
});
