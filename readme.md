# Items API (Express.js)

## 1. 개요

Node.js + Express 기반의 간단한 게시판 관리 예제 API입니다.  
항목 생성, 수정, 조회, 삭제 기능을 포함하며   
삭제된 항목을 복원하거나 영구 삭제하는 기능도 제공합니다.

모든 응답은 `success` 또는 `error` 구조를 따르며  
일관된 JSON 형식으로 반환됩니다.

개발 플랫폼은 JetBrains Webstorm을 사용했습니다.

---

## 2. 특징

- 항목 CRUD 기능
- 삭제된 항목 저장 및 복원 기능
- 항목 목록 전체 교체 기능
- 일관된 JSON 응답 포맷
- 유효성 검사를 위한 커스텀 미들웨어
- 임시 삭제용 휴지통 기능

---

## 3. Tech Stack

- **Node.js**
- **Express.js**
- **JavaScript**
- **Morgan** (HTTP logger)

---

## 4. 설치 방법

### 1) 저장소 클론
```bash
git clone <repository-url>
cd <project-folder>
```

### 2) 의존성 설치
```bash
npm install
```

### 3) 서버 실행
```bash
npm start
```

### 4) 기본 접속 URL
http://localhost:3000/

---

## 6. 기본 기능 표
일부 기능에는 body가 필요합니다.   
Postman, Insomnia, cURL 등으로 API 요청을 보낼 수 있습니다.

### Items API
| Method | Endpoint     | 설명            |
| ------ | ------------ | ------------- |
| GET    | `/items`     | 모든 항목 조회      |
| GET    | `/items/:id` | 특정 항목 조회      |
| POST   | `/items`     | 새 항목 추가       |
| PUT    | `/items/:id` | 특정 항목 수정      |
| PUT    | `/items`     | 항목 목록 전체 교체   |
| DELETE | `/items/:id` | 항목 삭제(휴지통 이동) |

### Deleted Items API
| Method | Endpoint             | 설명           |
| ------ | -------------------- | ------------ |
| GET    | `/items/deleted`     | 휴지통 항목 목록 조회 |
| DELETE | `/items/deleted`     | 휴지통 비우기      |
| POST   | `/items/restore/:id` | 삭제된 항목 복원    |
