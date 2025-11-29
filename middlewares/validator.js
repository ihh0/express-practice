// 검사를 위한 미들웨어 함수

const { error } = require('../public/javascripts/response');

// 항목 형식 검사용
function isValidItem(item) {
    if (
        !item ||
        typeof item.title !== 'string' ||
        item.title.trim() === '' ||
        typeof item.content !== 'string' ||
        item.content.trim() === ''
    ) {
        return false;
    }
    return true;
}


module.exports = {
    // body가 필요한 요청일 경우 검사하는 함수
    bodyRequired(req, res, next) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return error(res, 'Request body is required', 400);
        }
        next();
    },
    // 숫자로 된 파라미터를 받아야할 경우 숫자인지 검사하는 함수
    idParamNumber(req, res, next) {
        const id = req.params.id;
        if (isNaN(Number(id))) {
            return error(res, 'ID must be a number', 400);
        }
        next();
    },
    // 항목 형식이 맞는지 검사하는 함수
    validateItem(req, res, next) {
        if (!isValidItem(req.body)) {
            return error(res, "Invalid item. 'title' and 'content' must be non-empty strings.", 400);
        }
        next();
    },
    // 항목 목록이 맞는지 검사하는 함수
    validateItemList(req, res, next) {
        const list = req.body;

        // 목록이 맞는지 확인
        if (!Array.isArray(list)) {
            return error(res, "Body must be an array", 400);
        }

        // 목록 내 모든 항목 검사
        for (const item of list) {
            if (!isValidItem(item)) {
                return error(
                    res,
                    "Invalid item structure. Each item must contain 'title' and 'content' as strings.",
                    400
                );
            }
        }
        next();
    }
};