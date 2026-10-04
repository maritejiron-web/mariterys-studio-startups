export interface TechNode {
  id: string;
  name: string;
  category: 'frontend' | 'state_style' | 'backend' | 'database' | 'cache_msg' | 'cloud_devops';
  description: string;
  latencyRating: string;
  reliability: string;
  iconName: string;
}

export interface ArchitecturePreset {
  name: string;
  description: string;
  frontend: string;
  state_style: string;
  backend: string;
  database: string;
  cache_msg: string;
  cloud_devops: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  description: string;
  parameters: { name: string; type: string; placeholder: string; required: boolean }[];
}

export interface SimulatedDatabaseRow {
  id: string;
  createdAt: string;
  type: 'User' | 'Project' | 'Log';
  fieldA: string; // name / title
  fieldB: string; // email / description
  fieldC: string; // extra metadata
}

export interface FullStackProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: {
    latency: string;
    throughput: string;
    uptime: string;
    dbQueries: string;
  };
  colorTheme: string;
}

export interface CourseTopic {
  title: string;
  content: string;
  codeSnippet?: string;
  quizQuestion?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  title: string;
  duration: string;
  topics: CourseTopic[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  priceCRC: number;
  priceUSD: number;
  durationHours: number;
  difficulty: string;
  instructor: string;
  iconName: string;
  colorTheme: string;
  modules: CourseModule[];
}

// === StreamPAY / Pass Media Monetik Types ===

export interface StreamSponsorLink {
  id: string;
  brandName: string;
  productName: string;
  url: string;
  discountCode?: string;
  badge?: string;
}

export interface StreamComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
  tipAmount?: number;
  isPinned?: boolean;
  likes: number;
}

export interface StreamMediaItem {
  id: string;
  title: string;
  description: string;
  mediaType: 'video' | 'photo';
  mediaUrl: string;
  posterUrl: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  duration?: string;
  category: 'Tecnología' | 'Educación' | 'Gaming' | 'Vlogs' | 'Cursos & Masterclass' | 'Fitness & Salud' | 'Negocios & Finanzas' | 'Fotografía';
  views: number;
  likes: number;
  tipsCount: number;
  totalTipsAmountUSD: number;
  accessType: 'free' | 'ppv' | 'subscribers';
  ppvPriceUSD?: number;
  isLockedForUser?: boolean;
  tags: string[];
  createdAt: string;
  comments: StreamComment[];
  sponsorLinks?: StreamSponsorLink[];
}

export interface StreamMembershipTier {
  id: string;
  name: string;
  priceUSD: number;
  perks: string[];
  color: string;
}

export interface StreamCreator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  isVerified: boolean;
  subscribersCount: number;
  totalEarningsUSD: number;
  membershipTiers: StreamMembershipTier[];
  joinedDate: string;
}

export interface StreamTipTransaction {
  id: string;
  type: 'micro_tip' | 'ppv_purchase' | 'subscription';
  amountUSD: number;
  senderName: string;
  recipientCreator: string;
  mediaTitle?: string;
  timestamp: string;
  status: 'Completado' | 'Procesando' | 'Depositado';
  paymentMethod: string;
}

export interface CreatorAnalytics {
  totalViews: number;
  totalTipsUSD: number;
  totalPpvUSD: number;
  totalSubscriptionsUSD: number;
  totalBalanceUSD: number;
  dailyEarnings: { date: string; amountUSD: number }[];
}


