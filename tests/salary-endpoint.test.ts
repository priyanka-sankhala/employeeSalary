import request from 'supertest';
import app from '../src/app';

describe('Salary Endpoint', () => {
  it('should calculate salary for India', async () => {
    const res = await request(app).post('/salary/calculate').send({
      country: 'India',
      salary: 1000,
    });

    expect(res.status).toBe(200);
    expect(res.body.net).toBe(900);
    expect(res.body.deductions).toBe(100);
  });

  it('should calculate salary for United States', async () => {
    const res = await request(app).post('/salary/calculate').send({
      country: 'United States',
      salary: 1000,
    });

    expect(res.status).toBe(200);
    expect(res.body.net).toBe(880);
    expect(res.body.deductions).toBe(120);
  });

  it('should return full salary for other countries', async () => {
    const res = await request(app).post('/salary/calculate').send({
      country: 'Germany',
      salary: 1000,
    });

    expect(res.status).toBe(200);
    expect(res.body.net).toBe(1000);
    expect(res.body.deductions).toBe(0);
  });

});