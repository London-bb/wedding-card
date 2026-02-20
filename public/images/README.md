# 📸 웨딩 사진 폴더

이 폴더에 실제 웨딩 사진을 넣어주세요.

## 사진 추가 방법

1. 이 폴더(`public/images/`)에 사진 파일을 넣는다
2. `constants.ts`의 `PHOTO_FILES` 배열에 파일명을 추가한다

```ts
// constants.ts
const PHOTO_FILES = [
  'photo-1.jpg',
  'photo-2.jpg',
  'outdoor-01.jpg',  // ← 이렇게 추가
  'indoor-02.jpg',   // ← 계속 추가 가능
];
```

## 필수 및 설정 방법

| 파일명 | 설명 |
|---|---|
| 메인 커버 사진 | 메인 커버 사진은 파일명이 고정되어 있지 않으며, `src/config/constants.ts` 파일의 `COVER_IMAGE` 변수에서 원하는 사진 경로(예: `/images/flower2.jpg`)를 직접 지정하여 사용합니다. |
| 갤러리 사진들 | `constants.ts`의 `PHOTO_FILES` 배열에 나열된 모든 파일들 (개수 제한 없음) |

## 주의사항

- **권장 크기**: 웹 최적화를 위해 각 파일 **2MB 이하** 권장 (원본 4MB 이상이라면 압축 후 사용)
- **지원 형식**: `.jpg` `.jpeg` `.png` `.webp`

## 이미지 압축 도구

- [Squoosh](https://squoosh.app/) — 브라우저에서 압축 (무료)
- [TinyPNG](https://tinypng.com/) — PNG/JPG 압축 (무료)
