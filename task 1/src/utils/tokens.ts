
import Jwt from "jsonwebtoken";

class CreateTokens {
    accessToken = (id: any, role: string) =>
        Jwt.sign({_id: id, role}/* payload (data)*/,
             process.env.JWT_SECRET!/* secret key (random characters from (32:64) */,
            {expiresIn: process.env.JWT_EXPIRE/* date of expire (1d) */})
    resetToken = (id: any) =>
        Jwt.sign({_id: id}/* payload (data)*/,
             process.env.JWT_SECRET_RESET!/* secret key (random characters from (32:64) */,
            {expiresIn: process.env.JWT_EXPIRE_RESET/* date of expire (1m) */})
}

const createTokens = new CreateTokens();
export default createTokens;
