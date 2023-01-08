import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authUser = async (req, res, next) => {
  const random = `${process.env.RANDOM}`;
  try {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, random, (err, decode) => {
      if (err) {
        return res.status(401).json(err);
      }

      req.body.userID = decode.id;
      next();
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};