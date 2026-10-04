// StreamPAY Dedicated URL Generator and Link Resolver
// Ensures links work across any device, browser, and deployment environment

export const APP_BASE_URL = 'https://ais-dev-sbwi5ubisvnrjnooqdqzs6-346892738225.us-east5.run.app';

export function getCleanBaseUrl(): string {
  if (typeof window === 'undefined') {
    return APP_BASE_URL;
  }

  const origin = window.location.origin;
  if (origin && origin.includes('run.app')) {
    return origin.replace(/\/+$/, '');
  }

  return APP_BASE_URL;
}

/**
 * Direct Link to the Viral Survey & Pre-registration Campaign
 * Works on TikTok, Instagram, Threads, WhatsApp, Facebook, and direct browser navigation.
 */
export function getStreamPaySurveyUrl(): string {
  const base = getCleanBaseUrl();
  return `${base}/?project=streampay&tab=campaign#encuesta`;
}

/**
 * Direct Link to the main StreamPAY Platform (Feed, Video monetization, Wallet)
 */
export function getStreamPayAppUrl(): string {
  const base = getCleanBaseUrl();
  return `${base}/?project=streampay#streampay`;
}

/**
 * Formatted WhatsApp Share Text with direct link
 */
export function getStreamPayWhatsAppShareText(): string {
  const surveyUrl = getStreamPaySurveyUrl();
  return `🚨 *¡Atención Creadores y Maestros de Contenido!* 🚨\n\nResponde la encuesta oficial de *StreamPAY* y asegura tu *Perfil VIP con 0% de comisión* de por vida:\n👉 ${surveyUrl}\n\n¡Gana por streaming, contenido exclusivo y donaciones directas! 💰🎬`;
}
