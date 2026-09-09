const jwt = require('jsonwebtoken');
const salt = process.env.REACT_APP_COSTRACK_SALT

export const encodeData = async (data) => {
  try {
    const result = await jwt.sign(JSON.stringify(data), salt, { algorithm: 'HS256' });
    return result
  } catch (error) {
    console.error(error);
  };
};

export const decodeData = async (data) => {
  try {
    const result = await jwt.verify(data, salt, { algorithm: 'HS256' });
    return result
  } catch (error) {
    console.error(error);
  };
};