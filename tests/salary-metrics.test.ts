import request from 'supertest';
import app from '../src/app';

describe('Salary Metrics - Job Title', () => {
   // Average salary for country
    it('should return avg salary by country', async () => {
        const res = await request(app).get('/salary/metrics/country/India');
        expect(res.body.avg).toBeDefined();
      });

  // Average salary for job title
  it('should return average salary for given job title', async () => {
    await request(app).post('/employees').send({
        fullName: 'A',
        jobTitle: 'Engineer',
        country: 'India',
        salary: 1000,
      });
  
      await request(app).post('/employees').send({
        fullName: 'B',
        jobTitle: 'Engineer',
        country: 'US',
        salary: 2000,
      });
    const res = await request(app).get('/salary/metrics/job/Engineer');

    expect(res.status).toBe(200);
    expect(res.body.avg).toBe(1500);
  });

  //  No employees for job title
  it('should return null or 0 if no employees found', async () => {
    const res = await request(app).get('/salary/metrics/job/UnknownRole');

    expect(res.status).toBe(200);
    expect(res.body.avg === null || res.body.avg === 0).toBe(true);
  });

  });
