// 응답 포맷 함수
module.exports = {
    success(res, data, statusCode = 200) {
        return res.status(statusCode).json({
            status: "success",
            data
        });
    },

    error(res, message, statusCode = 400) {
        return res.status(statusCode).json({
            status: "error",
            message
        });
    }
};