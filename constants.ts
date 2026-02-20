import { BankAccount, ContactInfo, GalleryImage } from './types';

export const COUPLE = {
  groom: {
    name: "이",
    firstName: "승훈",
    father: "이진환",
    mother: "백영임",
    rank: "장남"
  },
  bride: {
    name: "이",
    firstName: "새롬",
    father: "이덕환",
    mother: "한현미",
    rank: "장녀"
  }
};

export const WEDDING_DATE = new Date('2026-05-31T12:20:00');
export const LOCATION = {
  name: "그랜드 볼룸홀 11층, 웨딩시티 신도림",
  address: "서울특별시 구로구 새말로 97",
  lat: 37.507084,
  lng: 126.887693,
  kakaoPlaceUrl: "https://place.map.kakao.com/26330155", // 웨딩시티 신도림 카카오맵 URL
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.036921674934!2d126.88764357714423!3d37.50704732753518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e6937008aa5%3A0x264f4474edc5342a!2z7Juo65Sp7Iuc7YuwIOyLoOuPhOumvOygkA!5e0!3m2!1sko!2skr!4v1768811784712!5m2!1sko!2skr"
};

export const INVITATION_TEXT = `
  서로 다른 세상에 살던 두 사람이
  사랑으로 승화되어 하나의 결실을 맺으려 합니다.
  
  언제나 곁에서 서로를 지켜주는 훈훈한 온기가 되겠습니다.
  두 사람이 함께 맞이할 새로운 시작이
  꽃처럼 함초롬하게 빛날 수 있도록 축복해 주십시오.
`;

export const COVER_IMAGE = '/images/flower2.jpg';

/**
 * 📸 갤러리 사진 설정
 * 사진을 추가하려면 PHOTO_FILES 배열에 파일명만 추가하세요.
 * 파일은 public/images/ 폴더에 넣어주세요.
 * 예: 'photo-7.jpg', 'outdoor-01.jpg', 'indoor-02.jpg'
 */
const PHOTO_FILES = [
  'blackwall1.jpg',
  'blackwall2.jpg',
  'blackwall3.jpg',
  'flower1.jpg',
  'flower2.jpg',
  'flower3.jpg',
  'flower_sol1.jpg',
  'flower_sol2.jpg',
  'indoor_1.jpg',
  'indoor_2.jpg',
  'indoor_3.jpg',
  'indoor_4.jpg',
  'indoor_5.jpg',
  'indoor_6.jpg',
  'indoor_7.jpg',
  'indoor_8.jpg',
  'indoor_9.jpg',
  'outdoor1.jpg',
  'outdoor2.jpg',
  'outdoor3.jpg',
  'outdoor_floor1.jpg',
  'outdoor_floor2.jpg',
  'rings.jpg',
  'stair1.jpg',
  'stair2.jpg',
  'stair3.jpg',
  'stair4.jpg',
  'stair5.jpg',
  'stair6.jpg',
  'stair7.jpg',
  'wall1.jpg',
  'wall2.jpg',
  'white1.jpg',
  'white_sol1.jpg',
  'white_sol2.jpg',
  'white_wall1.jpg',
  'white_wall2.jpg',
  'white_wall3.jpg',
  'white_wall_sol1.jpg',
  'white_wall_sol2.jpg',
];

export const GALLERY_IMAGES: GalleryImage[] = PHOTO_FILES.map((file, index) => ({
  id: index + 1,
  url: `/images/${file}`,
  alt: `웨딩 사진 ${index + 1}`,
}));

export const GROOM_ACCOUNTS: BankAccount[] = [
  { bank: "하나은행", accountNumber: "769-910315-07407", name: "이승훈" },
];

export const BRIDE_ACCOUNTS: BankAccount[] = [
  { bank: "국민은행", accountNumber: "987-654-3210", name: "이새롬" },
];

export const CONTACTS: ContactInfo[] = [
  { role: "신랑", name: "이승훈", phone: "010-9324-8732" },
  { role: "신부", name: "이새롬", phone: "010-9079-5415" },
];
