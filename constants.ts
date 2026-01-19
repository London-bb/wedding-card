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
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.036921674934!2d126.88764357714423!3d37.50704732753518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e6937008aa5%3A0x264f4474edc5342a!2z7Juo65Sp7Iuc7YuwIOyLoOuPhOumvOygkA!5e0!3m2!1sko!2skr!4v1768811784712!5m2!1sko!2skr"
};

export const INVITATION_TEXT = `
  서로 다른 세상에 살던 두 사람이
  사랑으로 승화되어 하나의 결실을 맺으려 합니다.
  
  언제나 곁에서 서로를 지켜주는 훈훈한 온기가 되겠습니다.
  두 사람이 함께 맞이할 새로운 시작이
  꽃처럼 함초롬하게 빛날 수 있도록 축복해 주십시오.
`;

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: 'https://picsum.photos/600/800?random=1', alt: 'Couple Photo 1' },
  { id: 2, url: 'https://picsum.photos/600/400?random=2', alt: 'Couple Photo 2' },
  { id: 3, url: 'https://picsum.photos/600/600?random=3', alt: 'Couple Photo 3' },
  { id: 4, url: 'https://picsum.photos/600/800?random=4', alt: 'Couple Photo 4' },
  { id: 5, url: 'https://picsum.photos/600/400?random=5', alt: 'Couple Photo 5' },
  { id: 6, url: 'https://picsum.photos/600/600?random=6', alt: 'Couple Photo 6' },
];

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
