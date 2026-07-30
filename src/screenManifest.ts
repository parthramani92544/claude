/**
 * Student Screen & UI-State Manifest
 * ==================================
 *
 * A single source of truth enumerating every STUDENT-facing screen and every
 * important UI state in the Gyan Vatika Pathshala app.
 *
 * These entries map 1:1 onto the app's existing `activeScreen` values (see the
 * `activeScreen === '<name>'` conditionals in App.tsx). Each entry is rendered
 * from the ACTUAL existing React components, CSS, icons, content and data — no
 * screen is recreated or reinterpreted here.
 *
 * The manifest is consumed by the dev-only `?screen=<screen>&state=<state>`
 * preview system (gated behind `import.meta.env.DEV`) so any single screen can
 * be rendered in isolation at the real mobile viewport, and by the capture
 * tooling that exports the live prototype to Claude Design.
 *
 * `screen`  -> the `activeScreen` value the app renders.
 * `state`   -> optional `?state=` variant used to demonstrate a specific UI
 *              state (empty / results / selected / locked / completed …).
 * `states`  -> UI states this entry inherently demonstrates on screen.
 */

export interface ScreenManifestEntry {
  /** Stable id, also used as the exported card file name. */
  id: string;
  /** The `activeScreen` value rendered by App.tsx. */
  screen: string;
  /** Optional `?state=` variant. */
  state?: string;
  /** Human-readable title. */
  title: string;
  /** Grouping used for the Claude Design pane. */
  group: string;
  /** Short description of what the screen shows. */
  description: string;
  /** UI states this entry demonstrates (documentation only). */
  states?: string[];
}

/** The exact mobile viewport the app renders every screen at (device frame). */
export const MOBILE_VIEWPORT = { width: 390, height: 810 } as const;

export const SCREEN_MANIFEST: ScreenManifestEntry[] = [
  // ── Onboarding & Authentication ─────────────────────────────────────────
  {
    id: '01-splash',
    screen: 'Splash',
    title: 'Splash Screen',
    group: 'Onboarding & Auth',
    description: 'Branded launch screen with logo, tagline and Start Learning CTA.',
  },
  {
    id: '02-language',
    screen: 'Language',
    title: 'Language Selection',
    group: 'Onboarding & Auth',
    description: 'Choose the app language (English / Hindi / Gujarati) with selected state.',
    states: ['selected'],
  },
  {
    id: '03-welcome',
    screen: 'Welcome',
    title: 'Welcome',
    group: 'Onboarding & Auth',
    description: 'Student vs Teacher entry choice on the welcome screen.',
  },
  {
    id: '04-register',
    screen: 'Register',
    title: 'Registration',
    group: 'Onboarding & Auth',
    description: 'Multi-step student registration form (step 1 pre-filled).',
  },
  {
    id: '05-login',
    screen: 'Login',
    title: 'Login',
    group: 'Onboarding & Auth',
    description: 'Phone + OTP student login (and teacher login toggle).',
  },
  {
    id: '06-payment',
    screen: 'Payment',
    title: 'Registration Fee',
    group: 'Onboarding & Auth',
    description: '₹100 registration fee payment screen with UPI / card options.',
  },
  {
    id: '07-forgot-password',
    screen: 'ForgotPassword',
    title: 'Forgot Password',
    group: 'Onboarding & Auth',
    description: 'Password reset request flow via email / phone.',
  },

  // ── Home & Syllabus ─────────────────────────────────────────────────────
  {
    id: '08-home',
    screen: 'Home',
    title: 'Home Dashboard',
    group: 'Home & Learning',
    description: 'Student dashboard: greeting, live class card, quick access grid, quote.',
  },
  {
    id: '09-syllabus',
    screen: 'Syllabus',
    title: 'Student Syllabus',
    group: 'Home & Learning',
    description: 'Level syllabus with chapters, completed and locked lesson states.',
    states: ['completed', 'locked'],
  },

  // ── Live Classes ────────────────────────────────────────────────────────
  {
    id: '10-live-class-list',
    screen: 'LiveClassList',
    title: 'Live Class List',
    group: 'Live Classes',
    description: 'List of live / upcoming / completed classes matched to the student.',
    states: ['live', 'upcoming', 'completed'],
  },
  {
    id: '11-live-class-details',
    screen: 'LiveClassDetails',
    title: 'Live Class Details',
    group: 'Live Classes',
    description: 'Details of a selected Level 3 live class with join action.',
    states: ['selected'],
  },
  {
    id: '12-live-class-room',
    screen: 'LiveClassRoom',
    title: 'Live Classroom',
    group: 'Live Classes',
    description: 'In-session classroom UI with video stage, chat and participants.',
  },

  // ── Sutras, Stavans & Audio ─────────────────────────────────────────────
  {
    id: '13-sutra-list',
    screen: 'SutraList',
    title: 'Sutra List',
    group: 'Sutras & Stavans',
    description: 'Browse sutras with categories, favourites and download states.',
  },
  {
    id: '14-sutra-details',
    screen: 'SutraDetails',
    title: 'Sutra Details',
    group: 'Sutras & Stavans',
    description: 'A single sutra with multi-language text, meaning and audio.',
    states: ['selected'],
  },
  {
    id: '15-audio-lyrics',
    screen: 'AudioLyrics',
    title: 'Audio & Lyrics',
    group: 'Sutras & Stavans',
    description: 'Full-screen audio player with synced lyrics.',
  },
  {
    id: '16-stavan-list',
    screen: 'StavanList',
    title: 'Stavan & Stuti',
    group: 'Sutras & Stavans',
    description: 'Devotional stavan library with browse / filter modes.',
  },
  {
    id: '17-stavan-details',
    screen: 'StavanDetails',
    title: 'Stavan Details',
    group: 'Sutras & Stavans',
    description: 'A selected stavan with singer, lyrics and playback.',
    states: ['selected'],
  },

  // ── Practice, Niyam & Games ─────────────────────────────────────────────
  {
    id: '18-niyam',
    screen: 'Niyam',
    title: 'Daily Niyam',
    group: 'Practice & Games',
    description:
      'Daily vows tracker showing Open (today), Locked (older) and Submitted/Completed days together.',
    states: ['open', 'locked', 'completed'],
  },
  {
    id: '19-bonus-event',
    screen: 'BonusEvent',
    title: 'Bonus Event',
    group: 'Practice & Games',
    description: 'Paryushan bonus activities with selectable / draft submission state.',
    states: ['selected', 'draft'],
  },
  {
    id: '20-games-home',
    screen: 'GamesHome',
    title: 'Games Home',
    group: 'Practice & Games',
    description: 'Games & trivia hub landing.',
  },
  {
    id: '21-games-quiz-hub',
    screen: 'GamesQuizHub',
    title: 'Quiz Hub',
    group: 'Practice & Games',
    description: 'AI quiz hub with category filters and difficulty badges.',
  },
  {
    id: '22-quiz',
    screen: 'Quiz',
    title: 'Quiz Screen',
    group: 'Practice & Games',
    description: 'An active quiz question with options and progress.',
    states: ['selected'],
  },

  // ── Profile & Progress ──────────────────────────────────────────────────
  {
    id: '23-profile',
    screen: 'Profile',
    title: 'Profile',
    group: 'Profile & Progress',
    description: 'Student profile with level, scores and menu.',
  },
  {
    id: '24-profile-attendance',
    screen: 'ProfileAttendance',
    title: 'Attendance',
    group: 'Profile & Progress',
    description: 'Attendance history and percentage breakdown.',
  },
  {
    id: '25-profile-guruji-approval',
    screen: 'ProfileGurujiApproval',
    title: 'Guruji Approval',
    group: 'Profile & Progress',
    description: 'Gatha / sutra submissions and their approval states.',
    states: ['approved', 'pending'],
  },
  {
    id: '26-profile-bonus-points',
    screen: 'ProfileBonusPoints',
    title: 'Bonus Points',
    group: 'Profile & Progress',
    description: 'Bonus points ledger of earned events.',
  },
  {
    id: '27-profile-report-card',
    screen: 'ProfileReportCard',
    title: 'Learning Progress',
    group: 'Profile & Progress',
    description: 'Report card with completed levels and performance score.',
    states: ['completed'],
  },
  {
    id: '28-profile-batch-change',
    screen: 'ProfileBatchChange',
    title: 'Batch Change',
    group: 'Profile & Progress',
    description: 'Request a batch change with remaining-changes allowance.',
  },

  // ── Utility ─────────────────────────────────────────────────────────────
  {
    id: '29-downloads',
    screen: 'Downloads',
    title: 'Downloads',
    group: 'Utility',
    description: 'Offline downloaded content library.',
  },
  {
    id: '30-notifications',
    screen: 'Notifications',
    title: 'Notifications',
    group: 'Utility',
    description: 'Notification feed with read / unread states.',
    states: ['unread', 'read'],
  },
  {
    id: '31-settings',
    screen: 'Settings',
    title: 'Settings',
    group: 'Utility',
    description: 'App settings and preferences.',
  },
  {
    id: '32-search-empty',
    screen: 'Search',
    title: 'Search — Empty',
    group: 'Utility',
    description: 'Global search in its empty state with popular terms.',
    states: ['empty'],
  },
  {
    id: '33-search-results',
    screen: 'Search',
    state: 'results',
    title: 'Search — Results',
    group: 'Utility',
    description: 'Global search showing filtered results for a query.',
    states: ['results'],
  },
];

export default SCREEN_MANIFEST;
