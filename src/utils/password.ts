import { Md5 } from "md5-typescript";

export class Password {

    public static encriptyPassword(password: string) {
        return Md5.init(`${password}${process.env.GIDU_JWT_KEY}`);
    }
}

