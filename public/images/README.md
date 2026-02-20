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

## 필수 파일

| 파일명 | 용도 |
|---|---|
| `cover.jpg` | 메인 커버 이미지 (히어로, 데스크탑 좌측 패널, 카카오 공유 썸네일) |
| `photo-*.jpg` | 갤러리 사진 (개수 제한 없음) |

## 주의사항

- **권장 크기**: 웹 최적화를 위해 각 파일 **2MB 이하** 권장 (원본 4MB 이상이라면 압축 후 사용)
- **지원 형식**: `.jpg` `.jpeg` `.png` `.webp`

## 이미지 압축 도구

- [Squoosh](https://squoosh.app/) — 브라우저에서 압축 (무료)
- [TinyPNG](https://tinypng.com/) — PNG/JPG 압축 (무료)
