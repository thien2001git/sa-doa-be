import express from "express";
import { parserJWTToken } from "../../../helpers/crypto";
import { responseErrors, responseUnauthorized } from "../../../helpers";
import userCollection from "../data/mongodb/collections/UserCollection";

export const authMiddleware = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const responseToken = parserJWTToken(req.headers.authorization);

  if (!responseToken.success) {
   responseUnauthorized(res,"Token Error")
  }

  try {
    const userId = responseToken.payload.id;
    const userDB =  userCollection.findById(userId);

    if (!userDB) {
        responseUnauthorized(res,"User not found")
    }

    
    res.locals.authUser = userDB;
    next()
  } catch (e: any) {
    return responseErrors(res,500,e.message)
  }
}