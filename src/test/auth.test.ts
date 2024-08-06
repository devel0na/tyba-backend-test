import http from "http";
import config from "../config/config";

/**
 * Test Login
 */
describe("POST /login", () => {
  it("Inicio de sesión exitoso, retorna token en cookies.", (done) => {
    const requestBody = JSON.stringify({
      email: "elina@ejemplo.com",
      password: "Elina.123",
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/login",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        let cookies = res.headers["set-cookie"] || [];
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(200);
            expect(cookies).not.toHaveLength(0);
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });

  it("Inicio de sesión no existoso. La contraseña es incorrecta.", (done) => {
    const requestBody = JSON.stringify({
      email: "elina@ejemplo.com",
      password: "Elina.23",
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/login",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        let cookies = res.headers["set-cookie"] || [];
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "Contraseña incorrecta."
            );
            expect(res.statusCode).toBe(400);
            expect(cookies).toHaveLength(0);
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });

  it("Inicio de sesión no existoso. El usuario no existe.", (done) => {
    const requestBody = JSON.stringify({
      email: "elina@ejempl.com",
      password: "Elina.23",
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/login",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        let cookies = res.headers["set-cookie"] || [];
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "Ha ocurrido un error. Usuario no encontrado"
            );
            expect(res.statusCode).toBe(400);
            expect(cookies).toHaveLength(0);
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });
});

describe("POST /signup", () => {
  it("Creación de usuario exitosa. Se notifica al usuario sobre la creación exitosa.", (done) => {
    const requestBody = JSON.stringify({
      name: "User",
      surname: "Test",
      email: "user@example40.com",
      password: "userExample.12",
      phone: 123,
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/signup",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(201);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "Usuario creado correctamente."
            );
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });

  it("Creación no existosa de usuario. Usuario ya existe.", (done) => {
    const requestBody = JSON.stringify({
      name: "User",
      surname: "Test",
      email: "user@example2.com",
      password: "userExample.12",
      phone: 123,
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/signup",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(400);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "Ha ocurrido un error. El usuario ya existe."
            );
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });

  it("Creación NO existosa. Información que provee el usuario no es correcta.", (done) => {
    const requestBody = JSON.stringify({
      name: "User",
      surname: "Test",
      email: "userexample2.com",
      password: "weakpassword",
      phone: 123,
    });

    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/signup",
        headers: { "Content-Type": "application/json" },
      },
      (res) => {
        let response = "";
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(400);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "Error en Validacion"
            );
            expect(jsonResponse.details).toHaveLength(2);
            done();
          } catch (error) {
            done(error);
          }
        });
      }
    );

    req.write(requestBody);
    req.end();
  });
});
