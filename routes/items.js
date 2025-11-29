var express = require('express');
var router = express.Router();

// 미들웨어 함수 로드
const { bodyRequired, idParamNumber, validateItem, validateItemList} = require('../middlewares/validator');

// 응답 함수 로드
const { error, success } = require('../public/javascripts/response');

// =========================================================================
// 내부 변수
// =========================================================================

// 항목이 저장될 리스트
let items = [
    {
        id: 1,
        title: "first post",
        content: "this is first content"
    },
    {
        id: 2,
        title: "second post",
        content: "this is second content"
    }
];
// 삭제된 항목이 저장될 리스트
let deletedItems = [];

// 다음 추가할 항목 id를 위한 내부변수
var lastId = items.length;

// =========================================================================
// 함수
// =========================================================================

// GET: 모든 항목 조회
router.get('/', (req, res) => {
    return success(res, items);
});

// 삭제된 항목 조회
router.get('/deleted', (req, res) => {
    return success(res, deletedItems);
})

// GET: 하나의 항목 조회
// 파라미터로 조회할 항목의 id 입력
router.get('/:id(\\d+)', idParamNumber, (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(items => items.id === id);

    if (!item) {
        return error(res, 'Item not found', 404);
    }

    return success(res, item);
})

// POST: 새 항목 추가
// body에 하나의 항목 입력
router.post('/', bodyRequired, validateItem, (req, res) => {
    const newItem = {
        id: ++lastId,
        ...req.body
    };

    items.push(newItem);
    return success(res, newItem);
});

// POST: 지워진 항목 복원
router.post('/restore/:id(\\d+)', idParamNumber, (req, res) => {
    const id = Number(req.params.id);

    // 삭제된 항목에서 검색
    const index = deletedItems.findIndex(item => item.id === id);

    // 항목을 찾지 못한 경우
    if (index === -1) {
        return error(res, 'Item not found', 404);
    }

    // 해당 항목 복원
    const restored = deletedItems.splice(index, 1)[0];
    restored.id = ++lastId;
    items.push(restored);

    return success(res, restored);
});

// PUT: 항목 수정
// body에 항목의 제목, 내용 입력
router.put('/:id(\\d+)', idParamNumber, bodyRequired, validateItem, (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return error(res, 'Item not found', 404);
    }

    items[index] = { id, ...req.body };
    return success(res, items[index]);
});

// PUT: 항목 목록 전체 교체
router.put('/', validateItemList, (req, res) => {
    const newList = req.body;

    // 새 목록에 id 자동 생성
    items = newList.map((item, index) => ({
        id: index + 1,
        ...item
    }));
    lastId = items.length;

    return success(res, items);
});

// DELETE: 휴지통 비우기 (영구 삭제)
router.delete('/deleted', (req, res) => {
    const count = deletedItems.length;

    // 휴지통 초기화
    deletedItems = [];

    return success(res, {
        message: "Deleted items cleared",
        deletedCount: count
    });
});

// DELETE: 항목 삭제 (휴지통으로 이동)
// 파라미터로 삭제할 항목 id 입력
router.delete('/:id(\\d+)', idParamNumber, (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(items => items.id === id);

    if (index === -1) {
        return error(res, 'Item not found', 404);
    }

    const removed = items.splice(index, 1)[0]; // 실제 삭제
    deletedItems.push(removed); // 삭제된 배열로 이동

    // 삭제 완료 메세지와 삭제된 항목 전송
    return success(res, removed);
});

module.exports = router;
