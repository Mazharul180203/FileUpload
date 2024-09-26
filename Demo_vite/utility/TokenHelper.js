import jwt from 'jsonwebtoken';

export const EncodeToken = (email, user_id) => {
    const KEY = "123-ABC-XYZ-123-ABC-XYZ";
    const EXPIRE = { expiresIn: '48h' };
    const PAYLOAD = { email, user_id };
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {
    try {
        const KEY = "123-ABC-XYZ-123-ABC-XYZ";
        return jwt.verify(token, KEY);
    } catch (error) {
        return null;
    }
};