import crypto from 'node:crypto';

// Ngày hiện tại + số ngày => unixtime
const addDaysToUnixTime =(days: number): number=> {
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const daysInSeconds = days * 24 * 60 * 60;
    return currentUnixTime + daysInSeconds;
}

// Mã hoá
export const hashHmacString = (string: string, algorithm = 'sha512') => {
    return (
        crypto
            .createHmac(algorithm, process.env.PRIVATE_KEY || 'admin')
            .update(string)
            .digest('hex')
    );
};
// Tạo token
export const generateJWTToken = (userId: string, algorithm = 'sha512', exp = 7) => {
    const header = JSON.stringify({
        alg: algorithm,
        type: 'JWT',
    });
    const payload = JSON.stringify({
        id: userId,
        iat: addDaysToUnixTime(0),
        exp: addDaysToUnixTime(exp),
    });
    const base64Header = Buffer.from(header).toString('base64').replace('==', '').replace('=', '');
    const base64Payload = Buffer.from(payload).toString('base64').replace('==', '').replace('=', '');
    const signature = hashHmacString(base64Header + '.' + base64Payload);
    return base64Header + '.' + base64Payload + '.' + signature;
};
interface JWTToken {
    success: boolean;
    errors?: string;
    payload?: any;
}
// Chuyển token ra JSON
export const parserJWTToken = (bearerToken?: string, withBearerPrefix = true) => {
    const responseToken: JWTToken = {
        success: false,
    };
    if (!bearerToken) return { ...responseToken, errors: 'Tokens is empty!' };
    try {
        let token = [];
        if (withBearerPrefix) {
            if (!bearerToken.split('Bearer ')[1]) return { ...responseToken, errors: 'Invalid JWT token format' };
            token = bearerToken.split(' ')[1].split('.');
        } else token = bearerToken.split('.');
        const [base64Header, base64Payload, signature] = token;
        const header = JSON.parse(Buffer.from(base64Header, 'base64').toString());
        if (hashHmacString(base64Header + '.' + base64Payload, header.alg) !== signature)
            return { ...responseToken, errors: 'Invalid JWT token format' };
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        if (addDaysToUnixTime(0) > payload.exp) return { ...responseToken, errors: 'Token has expired!' };

        return { ...responseToken, success: true, payload };
    } catch (e: any) {
        return { ...responseToken, errors: e.message };
    }
};