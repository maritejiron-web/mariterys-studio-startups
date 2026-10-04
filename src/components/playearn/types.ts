export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  balanceUSD: number;       // Dinero real acumulado disponible ($ USD)
  totalEarnedUSD: number;   // Total histórico ganado en la plataforma
  todayEarnedUSD: number;   // Total ganado hoy
  gems: number;             // Gemas acumuladas 💎
  diamonds: number;         // Diamantes acumulados 💠
  level: number;
  xp: number;
  dailyStreak: number;
  lastLoginDate: string;
  spinsLeft: number;        // Giros restantes en la rueda
  videosWatched: number;
  adsCompleted: number;     // Anuncios vistos 100% completos
  adsInterrupted: number;   // Anuncios cortados / anulados
  triviasPlayed: number;    // Trivias jugadas
  triviaCorrectAnswers: number;
  triviaBestStreak: number;
  reviewsSubmitted: number;
  puzzlesSolved: number;
  craftsCompleted: number;
  ebookPagesRead: number;
  mathKidsScore: number;
  mathTeensScore: number;
  vipRank?: 'Bronce' | 'Plata' | 'Oro' | 'Platino' | 'Diamante' | 'Maestro VIP';
}

export interface UserActivityLog {
  id: string;
  userId: string;
  type: 'video_ad' | 'trivia' | 'wheel' | 'puzzle' | 'craft' | 'ebook' | 'math' | 'withdrawal' | 'conversion';
  title: string;
  description: string;
  amountUSD: number;
  gems: number;
  diamonds: number;
  status: 'acreditado' | 'anulado_por_corte' | 'pendiente' | 'completado';
  timestamp: string;
}

export interface TriviaQuestion {
  id: string;
  category: 'Cultura General' | 'Ciencia & Tech' | 'Historia & Geografía' | 'Cine & TV' | 'Deportes' | 'Arte & Música' | 'Videojuegos';
  difficulty: 'Fácil' | 'Medio' | 'Experto';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  rewardUSD: number;
  rewardGems: number;
  rewardDiamonds: number;
  timeLimitSeconds: number;
}

export interface VideoAdTask {
  id: string;
  title: string;
  brand: string;
  category: string;
  durationSeconds: number;
  rewardUSD: number;
  rewardGems: number;
  rewardDiamonds: number;
  videoUrl: string;
  thumbnail: string;
  description: string;
  productName: string;
  productImage: string;
  likesCount: number;
  ratingAverage: number;
}

export interface ProductOpinion {
  id: string;
  productId: string;
  userId: string;
  userEmail: string;
  userName: string;
  rating: number;           // 1 to 5 stars
  liked: boolean;
  comment: string;
  pros: string;
  rewardEarned: number;
  createdAt: string;
}

export interface WheelPrize {
  id: number;
  label: string;
  type: 'usd' | 'gems' | 'diamonds' | 'spin' | 'jackpot';
  value: number;
  color: string;
  textColor: string;
  icon: string;
}

export interface CraftMaterial {
  id: string;
  name: string;
  icon: string;
  costGems: number;
  stock: number;
}

export interface CraftRecipe {
  id: string;
  name: string;
  description: string;
  requiredMaterials: { materialId: string; amount: number }[];
  craftTimeSeconds: number;
  sellPriceUSD: number;
  sellPriceDiamonds: number;
  image: string;
}

export interface EbookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  summary: string;
  rewardPerChapterUSD: number;
  rewardPerChapterDiamonds: number;
  chapters: {
    chapterNumber: number;
    title: string;
    content: string[];
  }[];
}

export interface MathQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'fácil' | 'medio' | 'reto';
  rewardGems: number;
  rewardDiamonds: number;
  rewardUSD: number;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userEmail: string;
  method: 'paypal' | 'bank_transfer' | 'sinpe_movil' | 'usdt';
  amountUSD: number;
  accountDetails: string;
  status: 'pendiente' | 'procesando' | 'completado';
  requestedAt: string;
}
