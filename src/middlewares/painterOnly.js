import jwt from 'jsonwebtoken';

function painterOnly(req, res, next) {
    const painterToken = req.headers['authorization']?.split(' ')[1];

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(painterToken, secretKey);

        const role = jwtDecoded.role;

        if (role !== 'painter-user') {
            console.log("서비스 사용 요청이 있습니다.하지만, 작가 토큰이 아님.");

        res.status(403).json({
            result: "forbidden-approach",
            reason: "작가만 접근할 수 있습니다..",
        });
        return;
        }
        next();
    } catch (error) {
        next(error);
    }
}

export { painterOnly };