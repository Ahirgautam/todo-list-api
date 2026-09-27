import { test } from "node:test"
import assert from "node:assert"
import request from "supertest"
import app from "../app.js"
let access_token;

test("POST /api/auth/login returns 200 for successfull login", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "valagautam220@gmail.com",
            password: "valaGautam#123"
        })
    // console.log(response.body)
    access_token = response.body.access_token
    assert.equal(response.status, 200)

})

test("POST /api/todos returns 201 for valid todo", async () => {
    const response = await request(app)
        .post("/api/todos/")
        .set("Authorization", `Bearer ${access_token}`)
        .send({
            title: "run task",
            status: "todo",
            description: "task"
        })

    assert.equal(response.status, 201)

})