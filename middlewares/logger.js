// 콘솔에 로그 출력을 위한 미들웨어 함수
module.exports = function (req, res, next) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
};