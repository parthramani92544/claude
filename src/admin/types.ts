export type AdminRole = 'SuperAdmin' | 'Trustee' | 'Admin' | 'Guruji' | 'Auditor';

export type PeopleSubTab = 'students' | 'approvals' | 'teachers';
export type AcademicSubTab = 'student_progress' | 'level_syllabus' | 'levels' | 'batches' | 'syllabus' | 'masters';
export type ClassesSubTab = 'live_classes' | 'attendance';
export type ContentSubTab = 'sutras' | 'stavans' | 'audio' | 'games';
export type ActivitiesSubTab = 'niyam' | 'bonus';
export type AdministrationSubTab = 'users' | 'audit_logs' | 'broadcast' | 'settings' | 'showcase' | 'design_system';

export type AdminTab =
  | 'overview'
  | 'dashboard'
  | 'people'
  | 'classes'
  | 'academic'
  | 'student_progress'
  | 'level_syllabus'
  | 'activities'
  | 'content'
  | 'reports'
  | 'administration'
  | 'students'
  | 'approvals'
  | 'teachers'
  | 'live_classes'
  | 'attendance'
  | 'levels'
  | 'batches'
  | 'masters'
  | 'niyam'
  | 'bonus'
  | 'sutras'
  | 'stavans'
  | 'audio'
  | 'games'
  | 'system_admin'
  | 'broadcast'
  | 'showcase'
  | 'design_system';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}

export interface AdminStudent {
  id: string;
  firstName: string;
  surname: string;
  photoUrl: string;
  dob: string;
  gender: 'Male' | 'Female';
  mobile: string;
  parentMobile: string;
  email: string;
  address: string;
  level: string;
  batch: string;
  isAttendingPathshala: boolean;
  attendanceRate: number;
  totalGathas: number;
  pointsBalance: number;
  status: 'Active' | 'Inactive';
  registrationDate: string;
}

export interface PendingRegistration {
  id: string;
  studentName: string;
  parentName: string;
  parentMobile: string;
  email: string;
  requestedLevel: string;
  preferredBatch: string;
  submissionDate: string;
  address: string;
  verificationFlags: {
    addressVerified: boolean;
    phoneVerified: boolean;
    docsVerified: boolean;
  };
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  notes?: string;
  registrationFee?: number;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed';
  paymentDate?: string;
  paymentTxnId?: string;
  paymentMethod?: 'UPI' | 'QR Code' | 'Card' | 'Net Banking';
}

export interface AdminTeacher {
  id: string;
  name: string;
  title: string;
  mobile: string;
  email: string;
  assignedLevels: string[];
  assignedBatches: string[];
  classesConducted: number;
  status: 'Active' | 'Inactive';
}

export type SyllabusLearningType = 'Sutra' | 'Stavan' | 'Gatha' | 'Story' | 'Activity' | 'Other';

export interface LevelSyllabusItem {
  id: string;
  levelId?: string;
  levelName?: string;
  chapterName: string;
  description?: string;
  learningType: SyllabusLearningType;
  displayOrder: number;
  status: 'Active' | 'Inactive';
  batchId?: string;
  batch?: string;
  audioUrl?: string;
  audioFileName?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  referenceTopic?: string;
  targetMinutes?: number;
  tags?: string[];
}

export interface AcademicLevel {
  id: string;
  code: string;
  name: string;
  description: string;
  minAge: number;
  maxAge: number;
  prerequisite: string;
  enrolledCount: number;
  batch?: string;
  batchId?: string;
  syllabus?: LevelSyllabusItem[];
}

export interface AcademicBatch {
  id: string;
  code: string;
  name?: string;
  timeSlot: string;
  description?: string;
  levelId?: string;
  level?: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  enrolledCount: number;
  operatingDays: string[];
}

export interface MasterEntry {
  id: string;
  category: 'Sects' | 'Cities' | 'Sangh' | 'Venues' | 'Qualifications' | 'Relationships' | 'Documents';
  value: string;
  code?: string;
  sortOrder?: number;
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface ScheduledClass {
  id: string;
  title: string;
  level: string;
  batch: string;
  teacherId: string;
  teacherName: string;
  classType: 'Regular' | 'General';
  dateTime: string;
  durationMinutes: number;
  meetingLink: string;
  status: 'Scheduled' | 'LIVE NOW' | 'Completed' | 'Cancelled';
  registeredCount: number;
}

export interface AttendanceRecordItem {
  studentId: string;
  studentName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

export interface AttendanceSessionLog {
  id: string;
  sessionDate: string;
  level: string;
  batch: string;
  classId: string;
  totalEnrolled: number;
  presentCount: number;
  absentCount: number;
  attendanceRate: number;
  status: 'Completed' | 'Pending';
  records: AttendanceRecordItem[];
}

export interface SutraCatalogItem {
  id: string;
  name: string;
  targetLevel: number;
  prakrit: string[];
  languages: string[];
  audioUrl: string;
  pdfLyrics: boolean;
}

export interface GathaSubmission {
  id: string;
  studentId: string;
  studentName: string;
  sutraId: string;
  sutraName: string;
  gathaCount: number;
  audioUrl: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  pointsAwarded: number;
  reviewerNotes?: string;
}

export interface StavanItem {
  id: string;
  title: string;
  dedicatedBhagwan: string;
  alphabetGroup: string;
  audioUrl: string;
  youtubeUrl: string;
  lyrics: string[];
}

export interface AudioAsset {
  id: string;
  title: string;
  category: 'Sutra' | 'Stavan' | 'Pravachan' | 'Bhakti';
  levelTarget: number;
  duration: string;
  fileSize: string;
  audioUrl: string;
}

export interface QuizGameItem {
  id: string;
  title: string;
  category: 'Quiz' | 'Memory Match' | 'Word Puzzle';
  levelTarget: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewardPoints: number;
  timesPlayed: number;
  configJson: string;
}

export interface NiyamSubmission {
  id: string;
  studentId: string;
  studentName: string;
  level: string;
  submissionDate: string;
  completedNiyams: string[];
  pointsEarned: number;
  status: 'Auto-Approved' | 'Pending Guruji' | 'Approved' | 'Rejected';
}

export interface NiyamRule {
  id: string;
  title: string;
  level: string;
  defaultPoints: number;
  autoApprove: boolean;
  description: string;
}

export interface BonusEventItem {
  id: string;
  title: string;
  eventType?: string;
  description: string;
  pointsValue: number;
  eventDate?: string;
  startDate?: string;
  endDate?: string;
  eligibleLevels: string[];
  applicableStudents?: string;
  status?: 'Active' | 'Inactive';
}

export interface PointsLedgerTransaction {
  id: string;
  timestamp: string;
  studentId: string;
  studentName: string;
  eventName?: string;
  reason: string;
  points: number;
  type: 'Credit' | 'Debit';
  adjustedBy: string;
  status?: 'Awarded' | 'Pending' | 'Cancelled';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  module: string;
  details: string;
  status: 'Success' | 'Failed';
}

export interface BroadcastMessage {
  id: string;
  title: string;
  category: string;
  targetAudience: string;
  dispatchedTime: string;
  channels: ('In-App' | 'WhatsApp' | 'SMS' | 'Email')[];
  messageBody: string;
  deliveryStatus: string;
}

export type ToastNotification = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
};

export type ToastMessage = ToastNotification;

export interface DailyQuoteItem {
  id: string;
  quote: string;
  author: string;
  language: 'HINDI' | 'ENGLISH' | 'GUJARATI';
  displayDate: string;
  status: 'PUBLISHED' | 'DRAFT';
  createdBy: string;
  lastUpdated: string;
  hasCustomBg: boolean;
}

export interface GurudevProfileItem {
  id: string;
  name: string;
  title: string;
  gachhadhipatiTitle: string;
  photoUrl: string;
  biography: string;
  dikshaDate: string;
  birthPlace: string;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface SadhuSadhvijiItem {
  id: string;
  name: string;
  category: 'Sadhu' | 'Sadhviji';
  currentLocation: string;
  dikshaYear: string;
  preshitBy: string;
  status: 'Active' | 'Vihar In Progress';
}

export interface ViharUpdateItem {
  id: string;
  monkGroup: string;
  fromLocation: string;
  toLocation: string;
  nextStop: string;
  distanceKm: number;
  expectedArrival: string;
  status: 'EN ROUTE' | 'COMPLETED' | 'SCHEDULED';
  updatedAt: string;
}

export interface ChaturmasDetailItem {
  id: string;
  year: string;
  sanghName: string;
  city: string;
  monkName: string;
  startDate: string;
  endDate: string;
  status: 'CURRENT' | 'UPCOMING' | 'COMPLETED';
}

export interface BookStoreItem {
  id: string;
  title: string;
  author: string;
  category: 'Granth' | 'Stavan Book' | 'Children' | 'History';
  price: number;
  stock: number;
  language: string;
  status: 'AVAILABLE' | 'OUT OF STOCK';
}

export interface SystemSettings {
  pathshalaName: string;
  academicYear: string;
  contactPhone: string;
  contactEmail: string;
  dailyNiyamCutoffTime: string;
  autoLogoutTimeoutMinutes: number;
}
