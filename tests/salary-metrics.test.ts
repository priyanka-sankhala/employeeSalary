import request from "supertest";
import app from "../src/app";

describe("Salary Metrics - Job Title", () => {
  // Average salary for country
  it("should return avg salary by country", async () => {
    const res = await request(app).get("/metrics/country/India");
    expect(res.body.avg).toBeDefined();
  });

  // Average salary for job title
  it("should return average salary for given job title", async () => {
    const res = await request(app).get("/metrics/job/Engineer");
    console.log(res.body.avg);
    expect(res.status).toBe(200);
  });

  //  No employees for job title
  it("should return null or 0 if no employees found", async () => {
    const res = await request(app).get("/metrics/job/UnknownRole");

    expect(res.status).toBe(200);
    expect(res.body.avg === null || res.body.avg === 0).toBe(true);
  });

  //  Single employee case
  it("should return same salary if only one employee exists", async () => {
    await request(app).post("/employees").send({
      fullName: "C",
      jobTitle: "Designer",
      country: "India",
      salary: 3000,
    });

    const res = await request(app).get("/metrics/job/Designer");

    expect(res.status).toBe(200);
    expect(res.body.avg).toBe(3000);
  });

  //  Large dataset simulation
  it("should handle multiple employees for same job title", async () => {
    const salaries = [1000, 2000, 3000, 4000];

    for (let i = 0; i < salaries.length; i++) {
      await request(app)
        .post("/employees")
        .send({
          fullName: `User${i}`,
          jobTitle: "QA",
          country: "India",
          salary: salaries[i],
        });
    }

    const res = await request(app).get("/metrics/job/QA");

    expect(res.status).toBe(200);
    expect(res.body.avg).toBe(2500);
  });
});
