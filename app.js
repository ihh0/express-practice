var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var itemsRouter = require('./routes/items');

var app = express();

// 뷰 엔진 설정
// api만 테스트하는 코드이므로 생략
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// 미들웨어 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 연결
app.use('/', indexRouter);
app.use('/items', itemsRouter);

// 라우팅 실패 시 404 에러 처리
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러. 에러 상태 코드와 상세 메시지를 JSON 형태로 만들어 응답
app.use(function(err, req, res, next) {
    const status = err.status || 500;

    // 응답 JSON 생성
    const errorResponse = {
        status,
        message: err.message
    };

    // 콘솔에 에러 로그를 추가로 출력
    console.error(err);

    // 개발 환경일 경우 에러 스택을 추가로 전송
    if (req.app.get('env') === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(status).json(errorResponse);
});

module.exports = app;
