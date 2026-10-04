import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { UserProfile, ProductOpinion, WithdrawalRequest, UserActivityLog } from './types';

const LOCAL_STORAGE_USER_KEY = 'playearn_cached_user';
const LOCAL_STORAGE_ACTIVITIES_KEY = 'playearn_activities';

export const DEFAULT_USER_PROFILE: UserProfile = {
  uid: 'guest_demo',
  email: 'invitado@playearn.app',
  displayName: 'Jugador Pro',
  balanceUSD: 14.75,
  totalEarnedUSD: 48.50,
  todayEarnedUSD: 4.85,
  gems: 520,
  diamonds: 42,
  level: 4,
  xp: 1250,
  dailyStreak: 5,
  lastLoginDate: new Date().toISOString(),
  spinsLeft: 4,
  videosWatched: 15,
  adsCompleted: 14,
  adsInterrupted: 2,
  triviasPlayed: 18,
  triviaCorrectAnswers: 15,
  triviaBestStreak: 7,
  reviewsSubmitted: 6,
  puzzlesSolved: 4,
  craftsCompleted: 3,
  ebookPagesRead: 25,
  mathKidsScore: 28,
  mathTeensScore: 20,
  vipRank: 'Oro'
};

const INITIAL_DEMO_ACTIVITIES: UserActivityLog[] = [
  {
    id: 'act-1',
    userId: 'guest_demo',
    type: 'video_ad',
    title: 'Anuncio SonicWave Audio 🎧',
    description: 'Completado 100% (20s verificado sin cortes)',
    amountUSD: 1.80,
    gems: 60,
    diamonds: 12,
    status: 'acreditado',
    timestamp: 'Hace 12 min'
  },
  {
    id: 'act-2',
    userId: 'guest_demo',
    type: 'trivia',
    title: 'Trivia Cultura General & Ciencia 🎯',
    description: 'Racha de 4 aciertos seguidos con bono multiplicador x1.5',
    amountUSD: 1.25,
    gems: 45,
    diamonds: 8,
    status: 'acreditado',
    timestamp: 'Hace 35 min'
  },
  {
    id: 'act-3',
    userId: 'guest_demo',
    type: 'video_ad',
    title: 'Anuncio Patrocinado Interrumpido ⚠️',
    description: 'El usuario pausó/cambió de pestaña antes del tiempo requerido. Ganancia anulada por regla.',
    amountUSD: 0.00,
    gems: 0,
    diamonds: 0,
    status: 'anulado_por_corte',
    timestamp: 'Hace 1 hora'
  },
  {
    id: 'act-4',
    userId: 'guest_demo',
    type: 'wheel',
    title: 'Giro Rueda de la Fortuna 🎡',
    description: 'Premio obtenido: $2.50 USD en efectivo retirable',
    amountUSD: 2.50,
    gems: 0,
    diamonds: 0,
    status: 'acreditado',
    timestamp: 'Hace 2 horas'
  },
  {
    id: 'act-5',
    userId: 'guest_demo',
    type: 'craft',
    title: 'Venta de Jarrón Cerámica Artesanal 🏺',
    description: 'Venta completada en el mercado artesanal',
    amountUSD: 2.20,
    gems: 0,
    diamonds: 15,
    status: 'acreditado',
    timestamp: 'Ayer'
  }
];

// Cargar logs de actividad
export function getUserActivityLogs(): UserActivityLog[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read activities:", e);
  }
  return INITIAL_DEMO_ACTIVITIES;
}

// Guardar nuevo log de actividad
export function saveUserActivityLog(log: UserActivityLog): void {
  try {
    const current = getUserActivityLogs();
    const updated = [log, ...current].slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_ACTIVITIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save activity log:", e);
  }
}

// Cargar perfil guardado localmente o por defecto
export function getStoredLocalProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn("Could not read local profile:", err);
  }
  return DEFAULT_USER_PROFILE;
}

export function saveStoredLocalProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.warn("Could not save local profile:", err);
  }
}

// Escuchar cambios de autenticación con Firebase
export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  try {
    return onAuthStateChanged(auth, callback);
  } catch (err) {
    console.warn("Firebase Auth listener error, fallback to offline state:", err);
    callback(null);
    return () => {};
  }
}

// Registro con Email y Contraseña en Firebase
export async function registerWithFirebaseEmail(email: string, pass: string, name: string): Promise<UserProfile> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email || email,
    displayName: name || email.split('@')[0],
    balanceUSD: 5.00, // Bono de bienvenida de $5 USD
    totalEarnedUSD: 5.00,
    todayEarnedUSD: 5.00,
    gems: 300,        // Bono de 300 Gemas
    diamonds: 20,     // Bono de 20 Diamantes
    level: 1,
    xp: 100,
    dailyStreak: 1,
    lastLoginDate: new Date().toISOString(),
    spinsLeft: 3,
    videosWatched: 0,
    adsCompleted: 0,
    adsInterrupted: 0,
    triviasPlayed: 0,
    triviaCorrectAnswers: 0,
    triviaBestStreak: 0,
    reviewsSubmitted: 0,
    puzzlesSolved: 0,
    craftsCompleted: 0,
    ebookPagesRead: 0,
    mathKidsScore: 0,
    mathTeensScore: 0,
    vipRank: 'Bronce'
  };

  // Guardar en Firestore
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      ...newProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (fsErr) {
    console.warn("Firestore write notice (using cache):", fsErr);
  }

  saveStoredLocalProfile(newProfile);
  return newProfile;
}

// Iniciar Sesión con Email y Contraseña en Firebase
export async function loginWithFirebaseEmail(email: string, pass: string): Promise<UserProfile> {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      const merged: UserProfile = { ...DEFAULT_USER_PROFILE, ...data, uid: user.uid, email: user.email || email };
      saveStoredLocalProfile(merged);
      return merged;
    }
  } catch (fsErr) {
    console.warn("Firestore read notice:", fsErr);
  }

  // Fallback si no existe en Firestore todavía
  const fallbackProfile: UserProfile = {
    ...DEFAULT_USER_PROFILE,
    uid: user.uid,
    email: user.email || email,
    displayName: user.displayName || email.split('@')[0]
  };
  saveStoredLocalProfile(fallbackProfile);
  return fallbackProfile;
}

// Cerrar sesión
export async function logoutFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn("Sign out error:", err);
  }
}

// Sincronizar actualización de saldo/recompensas en Firestore
export async function syncUserProfileToFirebase(profile: UserProfile): Promise<void> {
  saveStoredLocalProfile(profile);

  if (!profile.uid || profile.uid === 'guest_demo') {
    return;
  }

  try {
    const userDocRef = doc(db, 'users', profile.uid);
    await updateDoc(userDocRef, {
      balanceUSD: profile.balanceUSD,
      totalEarnedUSD: profile.totalEarnedUSD ?? profile.balanceUSD,
      todayEarnedUSD: profile.todayEarnedUSD ?? 0,
      gems: profile.gems,
      diamonds: profile.diamonds,
      level: profile.level,
      xp: profile.xp,
      dailyStreak: profile.dailyStreak,
      spinsLeft: profile.spinsLeft,
      videosWatched: profile.videosWatched,
      adsCompleted: profile.adsCompleted ?? profile.videosWatched,
      adsInterrupted: profile.adsInterrupted ?? 0,
      triviasPlayed: profile.triviasPlayed ?? 0,
      triviaCorrectAnswers: profile.triviaCorrectAnswers ?? 0,
      triviaBestStreak: profile.triviaBestStreak ?? 0,
      reviewsSubmitted: profile.reviewsSubmitted,
      puzzlesSolved: profile.puzzlesSolved,
      craftsCompleted: profile.craftsCompleted,
      ebookPagesRead: profile.ebookPagesRead,
      mathKidsScore: profile.mathKidsScore,
      mathTeensScore: profile.mathTeensScore,
      vipRank: profile.vipRank ?? 'Bronce',
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firestore sync deferred or offline:", err);
  }
}

// Guardar opinión de producto en Firestore
export async function saveProductReviewToFirestore(opinion: ProductOpinion): Promise<void> {
  try {
    if (opinion.userId && opinion.userId !== 'guest_demo') {
      await addDoc(collection(db, 'productReviews'), {
        ...opinion,
        createdAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn("Could not save review to Firestore:", err);
  }

  // Guardar en local
  try {
    const existing = JSON.parse(localStorage.getItem('playearn_reviews') || '[]');
    existing.unshift(opinion);
    localStorage.setItem('playearn_reviews', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn("Local review storage note:", e);
  }
}

// Guardar solicitud de retiro
export async function submitWithdrawalToFirestore(request: WithdrawalRequest): Promise<void> {
  try {
    if (request.userId && request.userId !== 'guest_demo') {
      await addDoc(collection(db, 'withdrawals'), {
        ...request,
        requestedAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn("Could not save withdrawal to Firestore:", err);
  }

  try {
    const existing = JSON.parse(localStorage.getItem('playearn_withdrawals') || '[]');
    existing.unshift(request);
    localStorage.setItem('playearn_withdrawals', JSON.stringify(existing));
  } catch (e) {
    console.warn("Local withdrawal storage note:", e);
  }
}
