import http from "http";
import config from "../config/config";

describe("POST /restaurants", () => {
  it("Retorno de lista de lugares. Retorna las lista de los restaurantes cercanos.", (done) => {
    const requestBody = JSON.stringify({ lat: "6.244203", lng: "-75.581215" });
    //TODO Requiere de tener un token válido
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImVtYWlsI2VsaW5hQGVqZW1wbG8uY29tIiwiaWF0IjoxNzIyOTY5ODM3LCJleHAiOjE3MjI5NzM0Mzd9.5vLO1tC1L1mwXLyD3k0r9dBK2N_FDVu-pRMzy7c-afk";
    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/locations/restaurants",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let response = "";
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(jsonResponse.responseMessage)).toBe(true);
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

  it("Valores incorrectos de lat. La solicitud no se debe procesar y se notifica al usuario.", (done) => {
    const requestBody = JSON.stringify({ lat: "none", lng: "-75.581215" });
    //TODO Requiere de tener un token válido
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImVtYWlsI2VsaW5hQGVqZW1wbG8uY29tIiwiaWF0IjoxNzIyOTY5ODM3LCJleHAiOjE3MjI5NzM0Mzd9.5vLO1tC1L1mwXLyD3k0r9dBK2N_FDVu-pRMzy7c-afk";
    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/locations/restaurants",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
          Authorization: `Bearer ${token}`,
        },
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
              "Ha ocurrido un error. No es posible procesar la solicitud."
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

  it("Token expirado. No se retorna información y se notifica al usuario.", (done) => {
    const requestBody = JSON.stringify({ lat: "6.244203", lng: "-75.581215" });

    const token = "invalidtoken";
    const req = http.request(
      {
        method: "POST",
        hostname: config.hostName,
        port: config.port,
        path: "/api/locations/restaurants",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let response = "";
        res.on("data", (chunk) => {
          response += chunk;
        });
        res.on("end", () => {
          try {
            const jsonResponse = JSON.parse(response);
            expect(res.statusCode).toBe(401);
            expect(jsonResponse).toHaveProperty(
              "responseMessage",
              "El token proporcionado es inválido."
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
});
