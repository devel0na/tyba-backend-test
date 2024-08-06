import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../config/config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      responseCode: 401,
      responseMessage: "No se encuentra el token.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      responseCode: 401,
      responseMessage: "No se encuentra el token.",
    });
  }

  if (!config.jwtSecret) {
    return res.status(500).json({
      responseCode: 500,
      responseMessage: "Error del servidor. Por favor intentélo más tarde.",
    });
  }

  try {
    const infoUser = jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        responseCode: 401,
        responseMessage: "El token proporcionado es inválido.",
      });
  }
};
