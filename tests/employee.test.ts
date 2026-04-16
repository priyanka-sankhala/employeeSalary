import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
  let employeeId: string;

  const employeePayload = {
    fullName: 'Rohan',
    jobTitle: 'Engineer',
    country: 'India',
    salary: 1000,
  };

  //  CREATE
  it('should create an employee', async () => {
    const res = await request(app).post('/employees').send(employeePayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.fullName).toBe(employeePayload.fullName);

    employeeId = res.body.id;
  });

  //  CREATE - Missing Fields
  it('should fail if required fields are missing', async () => {
    const res = await request(app).post('/employees').send({
      fullName: 'John',
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid request body');
  });

  // CREATE - Invalid Salary
  it('should fail if salary is negative', async () => {
    const res = await request(app).post('/employees').send({
      ...employeePayload,
      salary: -10,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid request body');
  });

  //  GET ALL
  it('should return all employees', async () => {
    const res = await request(app).get('/employees');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET BY ID
  it('should return employee by id', async () => {
    const res = await request(app).get(`/employees/${employeeId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(employeeId);
  });

  //  GET INVALID ID
  it('should return 404 for non-existing employee', async () => {
    const res = await request(app).get('/employees/invalid-id');

    expect(res.status).toBe(404);
  });

  //  UPDATE
  it('should update employee', async () => {
    const res = await request(app)
      .put(`/employees/${employeeId}`)
      .send({ jobTitle: 'Senior Engineer' });

    expect(res.status).toBe(200);
    expect(res.body.jobTitle).toBe('Senior Engineer');
  });

  //  UPDATE INVALID ID
  it('should fail update for non-existing employee', async () => {
    const res = await request(app)
      .put('/employees/invalid-id')
      .send({ jobTitle: 'X' });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  //  DELETE
  it('should delete employee', async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);

    expect(res.status).toBe(204);
  });

   //  DELETE AGAIN
   it('should return 404 when deleting already deleted employee', async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);

    expect(res.status).toBe(404);
   })

});