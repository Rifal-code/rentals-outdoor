export interface SiteConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  phoneWhatsapp: string;
  email: string;
  address: string;
  operationalHours: string;
  socials: {
    instagram: string;
    tiktok: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: '[ISI NANTI: NAMA BRAND]',
  tagline: 'KAMI SIAPKAN ALAT UNTUK SETIAP PUNCAK DAN JALUR',
  subTagline: 'carrier udah dicek. kamu tinggal jalan.',
  phoneWhatsapp: '[ISI NANTI: WHATSAPP]',
  email: '[ISI NANTI: EMAIL]',
  address: '[ISI NANTI: ALAMAT LENGKAP]',
  operationalHours: '[ISI NANTI: JAM OPERASIONAL]',
  socials: {
    instagram: '[ISI NANTI: INSTAGRAM]',
    tiktok: '[ISI NANTI: TIKTOK]',
  },
};
