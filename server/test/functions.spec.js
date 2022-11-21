const { expect } = require("chai");
const request = require("supertest");
const server = require("../server.js");

describe("Unit tests", () => {
  it("should accept post body", (done) => {
      request(server).post('/fb-clone-post')
                .send({
                  message: "hi", 
                  profilePic: "k", 
                  username: "k", 
                  image: "k", 
                  favourite: false, 
                  gif: false, 
                  userId: "1",
                  sharedFrom: "Pinterest-mockup",
                  link: "Pinterest-mockup"
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
  });
  it("should reject post body", (done) => {
      request(server).post('/fb-clone-post')
                .send()
                .expect(500)
                .end(function(err, res) {
                    done(err);
                });
  });
})