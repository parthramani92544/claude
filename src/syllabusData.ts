export interface SyllabusTopic {
  id: string;
  name: string;
  prakritName?: string;
  status: 'Not Started' | 'Pending Teacher Review' | 'Approved' | 'Rework Required' | 'Not Approved';
  assignedBy: string;
  dateAssigned: string;
  teacherRemarks?: string;
  audioDuration?: string;
  meaningSnippet?: string;
}

export interface SyllabusChapter {
  id: string;
  name: string;
  category: 'sutra' | 'stavan' | 'story' | 'philosophy' | 'other';
  description?: string;
  topics: SyllabusTopic[];
}

export interface LevelSyllabus {
  levelId: string; // e.g. "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"
  levelKey: string;
  levelName: string;
  subtitle: string;
  description: string;
  ageGroup: string;
  duration: string;
  prerequisite: string;
  levelBadge: string;
  imageType: 'bal_shala' | 'kumar_shala' | 'yuva_shala' | 'praudh_shala' | 'tatva_jnana';
  imageUrl?: string;
  enrolledStudentsCount: number;
  assignedTeacher: string;
  chapters: SyllabusChapter[];
}

export const syllabusData: Record<string, LevelSyllabus> = {
  "Level 1: Basic Sutras & Stories": {
    levelId: "Level 1",
    levelKey: "level-1",
    levelName: "Level 1: Bal Shala",
    subtitle: "Basic Sutras, Stavans & Moral Stories",
    description: "Introductory foundation course for young learners focusing on essential Jain prayers, pure pronunciation of foundational mantras, devotional stavans, and inspiring moral stories from Jain tradition.",
    ageGroup: "5 - 8 Years",
    duration: "6 Months",
    prerequisite: "None (Beginner Friendly)",
    levelBadge: "Bal Shala",
    imageType: "bal_shala",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    enrolledStudentsCount: 48,
    assignedTeacher: "Samani Pragya ji",
    chapters: [
      {
        id: "ch-1-sutra",
        name: "Sutra Path",
        category: "sutra",
        description: "Foundational sacred mantras and daily bowing sutras",
        topics: [
          {
            id: "t-1-1",
            name: "Navkar Mantra - Line 1 & 2",
            prakritName: "Ṇamō Arihantāṇaṁ, Ṇamō Siddhāṇaṁ",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Excellent pronunciation and rhythm!",
            audioDuration: "01:20",
            meaningSnippet: "Obeisance to the Arihantas and Siddhas."
          },
          {
            id: "t-1-2",
            name: "Navkar Mantra - Line 3 & 4",
            prakritName: "Ṇamō Āyariyāṇaṁ, Ṇamō Uvajjhāyāṇaṁ",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Very fluent recital of Namo Ayariyanam and Namo Uvajjayanam.",
            audioDuration: "01:15",
            meaningSnippet: "Obeisance to the Acharyas and Upadhyayas."
          },
          {
            id: "t-1-3",
            name: "Navkar Mantra - Line 5 to 7",
            prakritName: "Ṇamō Lōē Savva Sāhūṇaṁ...",
            status: "Pending Teacher Review",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-12",
            teacherRemarks: "Submitted for oral evaluation.",
            audioDuration: "01:45",
            meaningSnippet: "Obeisance to all Sadhus and the supreme fruit of Mangala."
          },
          {
            id: "t-1-4",
            name: "Chattari Mangalam - Full",
            prakritName: "Cattāri Maṅgalaṁ...",
            status: "Rework Required",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: "Please focus on the pronunciation of Kevali Pannatto Dhammo.",
            audioDuration: "02:10",
            meaningSnippet: "Four auspicious entities and four supreme refuges."
          },
          {
            id: "t-1-4b",
            name: "Panchindiya Sutra - Recital",
            prakritName: "Pañcindiyasandhāṇō...",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-25",
            teacherRemarks: "",
            audioDuration: "01:50",
            meaningSnippet: "Salutations to the 36 virtues of the Acharya."
          }
        ]
      },
      {
        id: "ch-1-stavan",
        name: "Stavan & Stuti",
        category: "stavan",
        description: "Melodious devotional hymns and guru praises",
        topics: [
          {
            id: "t-1-5",
            name: "Mahavir Swami Stavan (Trishala Nandan)",
            prakritName: "Triśalā Nandana Vīra Prabhu",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-20",
            teacherRemarks: "Sang with wonderful melody and devotion in Sunday class.",
            audioDuration: "03:40",
            meaningSnippet: "Praising Bhagwan Mahavira's compassion and non-violence."
          },
          {
            id: "t-1-6",
            name: "Guru Vandana Stuti",
            prakritName: "Gurudēva Karuṇā-sindhu",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-22",
            teacherRemarks: "",
            audioDuration: "02:30",
            meaningSnippet: "Expressing reverence to holy Spiritual Gurus."
          },
          {
            id: "t-1-6b",
            name: "Jinvar Stuti (Jay Jinendra Dhuni)",
            prakritName: "Jaya Jina Śāsana Jayavanta Thāō",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-28",
            teacherRemarks: "",
            audioDuration: "02:15",
            meaningSnippet: "May the victorious Jain order bring peace to all beings."
          }
        ]
      },
      {
        id: "ch-1-stories",
        name: "Jain Stories",
        category: "story",
        description: "Moral character building kathas from Jain scriptures",
        topics: [
          {
            id: "t-1-7",
            name: "Story of King Shrenik & Queen Chelna",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-10",
            teacherRemarks: "Fantastic retentive details and understood the moral extremely well.",
            audioDuration: "05:10",
            meaningSnippet: "Transforming anger into boundless faith and devotion."
          },
          {
            id: "t-1-8",
            name: "Story of Chandakaushik Snake & Mahavira",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-25",
            teacherRemarks: "Understood the message: 'Bujjha Bujjha Chandakausiya!'",
            audioDuration: "06:00",
            meaningSnippet: "Awakening forgiveness and overcoming destructive anger."
          },
          {
            id: "t-1-9",
            name: "Story of Elephant Metarya",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-30",
            teacherRemarks: "",
            audioDuration: "04:45",
            meaningSnippet: "Unflinching restraint, patience, and non-violence even under trial."
          }
        ]
      }
    ]
  },
  "Level 2: Jain Geography & Symbols": {
    levelId: "Level 2",
    levelKey: "level-2",
    levelName: "Level 2: Kumar Shala",
    subtitle: "Jain Geography, Symbols & Daily Rituals",
    description: "Intermediate learning covering the structure of the Jain Cosmos (Teen Lok), deep spiritual symbolism of the Jain Emblem, sacred Panchrangi Flag, and intermediate recitation of Logassa and Karemi Bhante.",
    ageGroup: "8 - 11 Years",
    duration: "1 Year",
    prerequisite: "Level 1 (Bal Shala) completion",
    levelBadge: "Kumar Shala",
    imageType: "kumar_shala",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
    enrolledStudentsCount: 42,
    assignedTeacher: "Samani Prasanna ji",
    chapters: [
      {
        id: "ch-2-sutra",
        name: "Sutra Path",
        category: "sutra",
        description: "Recitation of praise and repentance sutras",
        topics: [
          {
            id: "t-2-1",
            name: "Khamasama Sutra - Full Recital",
            prakritName: "Icchāmi Khamāsamāṇō...",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Great execution of Vandium Javanijjae. Keep it up.",
            audioDuration: "01:30",
            meaningSnippet: "Humble bowing and asking forgiveness from the Gurus."
          },
          {
            id: "t-2-2",
            name: "Logassa Sutra - Gatha 1 & 2",
            prakritName: "Lōgassa Ujjōagarē, Dhammatitthayarē Jiṇē...",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-08",
            teacherRemarks: "Proper speeds and breath pacing.",
            audioDuration: "02:00",
            meaningSnippet: "Praising the 24 Tirthankaras who illuminate the universe."
          },
          {
            id: "t-2-3",
            name: "Logassa Sutra - Gatha 3 & 4",
            prakritName: "Usabhama Jiyañca Vandē...",
            status: "Pending Teacher Review",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: "Submitted for oral recitation check.",
            audioDuration: "02:15",
            meaningSnippet: "Naming Rishabhadeva, Ajitanatha, Sambhavanatha..."
          },
          {
            id: "t-2-4",
            name: "Logassa Sutra - Gatha 5 to 8",
            prakritName: "Candaēsu Nimmalayarā, Āiccēsu Ahiyaṁ Payāsayarā...",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-22",
            teacherRemarks: "",
            audioDuration: "02:45",
            meaningSnippet: "Purer than moons, brighter than suns: may the Siddhas grant Moksha."
          }
        ]
      },
      {
        id: "ch-2-stavan",
        name: "Stavan & Stuti",
        category: "stavan",
        description: "Sacred Stotras and classic devotional compositions",
        topics: [
          {
            id: "t-2-5b",
            name: "Uvasaggaharam Stotram - Gatha 1 to 3",
            prakritName: "Uvasaggaharaṁ Pāsaṁ...",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-10",
            teacherRemarks: "Flawless pronunciation of sacred syllables.",
            audioDuration: "03:15",
            meaningSnippet: "Overcoming obstacles through devotion to Bhagwan Parshvanatha."
          },
          {
            id: "t-2-5c",
            name: "Bhaktamar Stotra - Gatha 1 (Selected)",
            prakritName: "Bhaktāmara-praṇata-mauli-maṇi-prabhāṇāṁ...",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-27",
            teacherRemarks: "",
            audioDuration: "03:50",
            meaningSnippet: "Acharya Manatunga's world-renowned Sanskrit hymn."
          }
        ]
      },
      {
        id: "ch-2-stories",
        name: "Jain Stories",
        category: "story",
        description: "Stories of extreme renunciation, generosity, and supreme endurance",
        topics: [
          {
            id: "t-2-7b",
            name: "Story of Shalibhadra - Wealth to Renunciation",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-12",
            teacherRemarks: "Detailed essay on the essence of non-attachment.",
            audioDuration: "06:30",
            meaningSnippet: "Relinquishing unimaginable earthly wealth for spiritual truth."
          },
          {
            id: "t-2-7c",
            name: "Story of Gajsukumal - Unshakable Equanimity",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-29",
            teacherRemarks: "",
            audioDuration: "07:15",
            meaningSnippet: "Attaining supreme liberation while maintaining pure compassion."
          }
        ]
      },
      {
        id: "ch-2-geo",
        name: "Jain Geography & Symbols",
        category: "philosophy",
        description: "Cosmology and sacred visual symbols of Jainism",
        topics: [
          {
            id: "t-2-5",
            name: "The Jain Emblem (Parasparopagraho Jivanam)",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Excellent essay on the significance of mutual assistance of all life.",
            audioDuration: "04:00",
            meaningSnippet: "Understanding the Ahimsa hand, 24 spokes, and three jewels."
          },
          {
            id: "t-2-6",
            name: "The Panchrangi Flag Colors & Meaning",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-26",
            teacherRemarks: "Knows all 5 colors corresponding to the 5 Supreme Beings.",
            audioDuration: "03:10",
            meaningSnippet: "Red (Siddha), White (Arihant), Yellow (Acharya), Blue (Upadhyaya), Black (Sadhu)."
          },
          {
            id: "t-2-7",
            name: "Three Worlds (Teen Lok) Structure",
            status: "Rework Required",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-18",
            teacherRemarks: "Please revise the dimensions of Madhya Lok and Adho Lok again.",
            audioDuration: "05:20",
            meaningSnippet: "Cosmology of Urdhva Lok, Madhya Lok, and Adho Lok."
          },
          {
            id: "t-2-8",
            name: "Siddha Shila Structure & Moksha",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-28",
            teacherRemarks: "",
            audioDuration: "04:15",
            meaningSnippet: "The abode of liberated, infinite pure souls at cosmic apex."
          }
        ]
      }
    ]
  },
  "Level 3: Pratikraman & Advanced Vows": {
    levelId: "Level 3",
    levelKey: "level-3",
    levelName: "Level 3: Yuva Shala",
    subtitle: "Pratikraman, Advanced Vows & Samayik Vidhi",
    description: "Advanced curriculum for youth and adult practitioners focusing on mastery of Pratikraman sutras, complete Samayik Vidhi rituals, 12 Shravak Vows, Six Dravyas, and deeper contemplation of nine spiritual Tattvas.",
    ageGroup: "11 - 15 Years",
    duration: "1 Year",
    prerequisite: "Level 2 (Kumar Shala) completion",
    levelBadge: "Yuva Shala",
    imageType: "yuva_shala",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    enrolledStudentsCount: 38,
    assignedTeacher: "Pujya Samanji Dr. Shrutpragya ji",
    chapters: [
      {
        id: "ch-3-pratikraman",
        name: "Sutra Path & Pratikraman",
        category: "sutra",
        description: "Essential Pratikraman rituals and repentance sutras",
        topics: [
          {
            id: "t-3-1",
            name: "Iryavahiyam Sutra - Gatha 1 & 2",
            prakritName: "Icchākārēṇa Sandisaha Bhagavana! Iriyāvahiyāē...",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Perfect recitation, crystal clear syllables and perfect pauses.",
            audioDuration: "02:10",
            meaningSnippet: "Seeking forgiveness for unintentional harm while walking."
          },
          {
            id: "t-3-2",
            name: "Iryavahiyam Sutra - Gatha 3 & 4",
            prakritName: "Pāṇakkamaṇē, Bīyakkamaṇē, Hariyakkamaṇē...",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Very clear and fluent recitation.",
            audioDuration: "02:00",
            meaningSnippet: "Atoning for injury to living organisms, seeds, and greenery."
          },
          {
            id: "t-3-3",
            name: "Namutthunam Sutra - Gatha 1 to 3",
            prakritName: "Ṇamutthuvaṇaṁ Arihantāṇaṁ Bhagavantāṇaṁ...",
            status: "Pending Teacher Review",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-10",
            teacherRemarks: "Under review by Pujya Guruji.",
            audioDuration: "03:10",
            meaningSnippet: "Praise of the 32 divine virtues of the Arihantas."
          },
          {
            id: "t-3-4",
            name: "Namutthunam Sutra - Gatha 4 to 6",
            prakritName: "Purisasīhāṇaṁ, Purisavara-puṇḍarīyāṇaṁ...",
            status: "Rework Required",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: "Please focus on the pronunciation of 'Purisasihanam' and 'Purisavara-pundariyanam'.",
            audioDuration: "03:30",
            meaningSnippet: "Lions among men, supreme white lotus among men."
          },
          {
            id: "t-3-5",
            name: "Khamasama Sutra - Complete Ritual Posture",
            prakritName: "Icchāmi Khamāsamāṇō...",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-03",
            teacherRemarks: "Outstanding physical posture, clear speed, and deep devotion shown.",
            audioDuration: "01:45",
            meaningSnippet: "Five limbs touching the floor with humility."
          }
        ]
      },
      {
        id: "ch-3-stavan",
        name: "Stavan & Stuti",
        category: "stavan",
        description: "Spiritual stutis recited in daily Samayik & Pratikraman",
        topics: [
          {
            id: "t-3-stavan-1",
            name: "Santikaram Stotra (Peace Stotram)",
            prakritName: "Santikaraṁ Santi-jiṇaṁ...",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-07",
            teacherRemarks: "Recited with serene peace and correct rhythm.",
            audioDuration: "03:55",
            meaningSnippet: "Invoking peace and tranquility of Bhagwan Shantinath."
          },
          {
            id: "t-3-stavan-2",
            name: "Tijayapahutta Stotra",
            prakritName: "Tijayapahutta Pavittha...",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-24",
            teacherRemarks: "",
            audioDuration: "04:10",
            meaningSnippet: "Praise of the Lord worshipped across three realms."
          }
        ]
      },
      {
        id: "ch-3-stories",
        name: "Jain Stories",
        category: "story",
        description: "Inspiring life legends of Tirthankaras and historical Shravaks",
        topics: [
          {
            id: "t-3-story-1",
            name: "Story of King Meghrath & The Dove",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-09",
            teacherRemarks: "Understood the ultimate sacrifice of flesh to save a surrendered dove.",
            audioDuration: "06:40",
            meaningSnippet: "Compassion without limits: the previous birth of Bhagwan Shantinath."
          },
          {
            id: "t-3-story-2",
            name: "Story of Anath Muni (True Shelter)",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-16",
            teacherRemarks: "Well narrated in the oral discussion session.",
            audioDuration: "07:20",
            meaningSnippet: "Finding inner shelter in Dharma when worldly remedies fail."
          }
        ]
      },
      {
        id: "ch-3-vows",
        name: "Vows & Philosophy",
        category: "philosophy",
        description: "12 Shravak Vows, Samayik ritual, and Tattva fundamentals",
        topics: [
          {
            id: "t-3-6",
            name: "12 Vows of a Shravak (Anuvratas & Gunavratas)",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-08",
            teacherRemarks: "Deep comprehension of the 5 core Anuvratas shown in class discussion.",
            audioDuration: "05:40",
            meaningSnippet: "5 Anuvratas, 3 Gunavratas, and 4 Shikshavratas."
          },
          {
            id: "t-3-7",
            name: "Samayik Vidhi & 32 Faults (Aticharas)",
            status: "Not Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-12",
            teacherRemarks: "Did not recall the 32 faults or the 'Karemi Bhante' vow text. Please study and re-attempt.",
            audioDuration: "06:15",
            meaningSnippet: "48 minutes of equanimity free from bodily and mental faults."
          },
          {
            id: "t-3-8",
            name: "Six Avashyakas (Daily Essential Duties)",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-25",
            teacherRemarks: "",
            audioDuration: "04:30",
            meaningSnippet: "Samayik, Chaturvimshati Stava, Vandana, Pratikraman, Kayotsarga, Pratyakhyana."
          },
          {
            id: "t-3-9",
            name: "Six Dravyas (Cosmic Substances)",
            status: "Pending Teacher Review",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-18",
            teacherRemarks: "",
            audioDuration: "05:00",
            meaningSnippet: "Jiva, Pudgala, Dharma, Adharma, Akasha, Kala."
          },
          {
            id: "t-3-10",
            name: "Nine Tattvas (Spiritual Fundamentals)",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-28",
            teacherRemarks: "",
            audioDuration: "05:30",
            meaningSnippet: "Jiva, Ajiva, Punya, Papa, Asrava, Samvara, Nirjara, Bandha, Moksha."
          }
        ]
      }
    ]
  },
  "Level 4: Jain Siddhanta & Karma Theory": {
    levelId: "Level 4",
    levelKey: "level-4",
    levelName: "Level 4: Praudh Shala",
    subtitle: "Jain Siddhanta, Karma Theory & Nav Tattva",
    description: "Deep study of the 8 types of Karma, causes of soul bondage (Bandha) and liberation (Moksha), study of selections from Uttaradhyayana and Dashavaikalika Sutras, and introspective analysis of Leshyas and Bhavnas.",
    ageGroup: "15+ Years",
    duration: "1 Year",
    prerequisite: "Level 3 (Yuva Shala) completion",
    levelBadge: "Praudh Shala",
    imageType: "praudh_shala",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800",
    enrolledStudentsCount: 31,
    assignedTeacher: "Acharya Shree Mahapragya Vidhyapeeth",
    chapters: [
      {
        id: "ch-4-sutra",
        name: "Sutra Path & Agam Chants",
        category: "sutra",
        description: "Readings and chanting from core canonical scriptures",
        topics: [
          {
            id: "t-4-1",
            name: "Uttaradhyayana Sutra - Chapter 1 (Vinaya Shruta)",
            prakritName: "Sārambhāṇaṁ ca Vattīsaṁ...",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-01",
            teacherRemarks: "",
            audioDuration: "08:15",
            meaningSnippet: "Spiritual discipline (Vinaya) as the supreme root of Dharma."
          },
          {
            id: "t-4-2",
            name: "Dashavaikalika Sutra - Chapter 1 (Dhammo Mangala Mukkitham)",
            prakritName: "Dhammō Maṅgalamukkiṭṭhaṁ, Ahiṁsā Saṁyamō Tapō...",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-05",
            teacherRemarks: "",
            audioDuration: "06:45",
            meaningSnippet: "Ahimsa, Samyama, and Tapa: even gods bow to those who practice them."
          }
        ]
      },
      {
        id: "ch-4-stavan",
        name: "Stavan & Stuti",
        category: "stavan",
        description: "Philosophical compositions and Ratnakar Pachisi",
        topics: [
          {
            id: "t-4-3",
            name: "Ratnakar Pachisi - Selected Verses",
            prakritName: "Ratnākara Pachīsī Gāthā 1 to 5",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-10",
            teacherRemarks: "",
            audioDuration: "05:50",
            meaningSnippet: "Deep soul introspection and confession of mental faults."
          }
        ]
      },
      {
        id: "ch-4-stories",
        name: "Jain Stories & Legends",
        category: "story",
        description: "Deep allegorical kathas of high spiritual attainment",
        topics: [
          {
            id: "t-4-4",
            name: "Story of Ilachiputra (Acrobat to Arhat)",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-15",
            teacherRemarks: "",
            audioDuration: "09:00",
            meaningSnippet: "Attaining enlightenment while balancing on a bamboo pole with complete mindfulness."
          },
          {
            id: "t-4-5",
            name: "Story of King Bharat Chakravarti (Aina Mahal)",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-20",
            teacherRemarks: "",
            audioDuration: "08:30",
            meaningSnippet: "Realizing transient nature of body in the mirror palace."
          }
        ]
      },
      {
        id: "ch-4-karma",
        name: "Karma Doctrine & Principles",
        category: "philosophy",
        description: "Detailed mechanics of 8 Karma categories and soul states",
        topics: [
          {
            id: "t-4-6",
            name: "8 Main Karma Categories & 148 Sub-types",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-22",
            teacherRemarks: "",
            audioDuration: "10:30",
            meaningSnippet: "Ghatiya and Aghatiya Karmas: Jnanavarniya, Darshanavarniya, Vedaniya, Mohaniya..."
          },
          {
            id: "t-4-7",
            name: "6 Leshyas (Thought Colorations)",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-25",
            teacherRemarks: "",
            audioDuration: "07:45",
            meaningSnippet: "Black, Blue, Grey, Orange, Lotus-Pink, and White soul dispositions."
          },
          {
            id: "t-4-8",
            name: "12 Anuprekshas (Reflections on Reality)",
            status: "Not Started",
            assignedBy: "Acharya Shree Mahapragya Vidhyapeeth",
            dateAssigned: "2026-07-28",
            teacherRemarks: "",
            audioDuration: "09:15",
            meaningSnippet: "Contemplating impermanence, helplessness, and solitude of the soul."
          }
        ]
      }
    ]
  },
  "Level 5: Tatva Jnana & Agam Study": {
    levelId: "Level 5",
    levelKey: "level-5",
    levelName: "Level 5: Tatva Jnana",
    subtitle: "Advanced Agam Studies & Dhyan Sadhana",
    description: "Supreme advanced theological and meditative curriculum exploring Tattvartha Sutra in-depth, Anekantavada & Syadvada epistemology, 14 Gunasthanas ladder of spiritual elevation, and pure Kayotsarga Dhyan.",
    ageGroup: "Advanced",
    duration: "1.5 Years",
    prerequisite: "Level 4 (Praudh Shala) completion",
    levelBadge: "Tatva Jnana",
    imageType: "tatva_jnana",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800",
    enrolledStudentsCount: 22,
    assignedTeacher: "Pujya Samanji Dr. Shrutpragya ji",
    chapters: [
      {
        id: "ch-5-sutra",
        name: "Sutra Path & Scriptural Chanting",
        category: "sutra",
        description: "Tattvartha Sutra chanting and Sanskrit agamic aphorisms",
        topics: [
          {
            id: "t-5-1",
            name: "Tattvartha Sutra - Chapter 1 (Moksha Marga)",
            prakritName: "Samyagdarśana-jñāna-cāritrāṇi Mokṣamārgaḥ...",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-01",
            teacherRemarks: "",
            audioDuration: "12:00",
            meaningSnippet: "Right faith, right knowledge, and right conduct constitute the path to liberation."
          },
          {
            id: "t-5-2",
            name: "Acharanga Sutra - Selected Aphorisms on Ahimsa",
            prakritName: "Savvē pāṇā na hantavvā...",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-05",
            teacherRemarks: "",
            audioDuration: "10:30",
            meaningSnippet: "All beings desire to live, none wish to be killed."
          }
        ]
      },
      {
        id: "ch-5-stavan",
        name: "Stavan & Mystical Stutis",
        category: "stavan",
        description: "Mystic hymns of Anandghanji and Kshamapana",
        topics: [
          {
            id: "t-5-3",
            name: "Anandghan Chovisi - Rishabh Jineshwar Stavan",
            prakritName: "Ṛṣabha Jinēśvara Pritama Mahrō...",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-10",
            teacherRemarks: "",
            audioDuration: "08:40",
            meaningSnippet: "Deep esoteric poetry of union between the seeker and the divine."
          },
          {
            id: "t-5-4",
            name: "Universal Kshamapana Stuti (Khamemi Savva Jive)",
            prakritName: "Khamēmi Savva Jīvē, Savvē Jīvā Khamantu Mē...",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-15",
            teacherRemarks: "",
            audioDuration: "04:30",
            meaningSnippet: "I grant forgiveness to all beings; may all beings forgive me."
          }
        ]
      },
      {
        id: "ch-5-philosophy",
        name: "Jain Epistemology & Higher Philosophy",
        category: "philosophy",
        description: "Anekantavada, Syadvada, Nayas, and 14 Gunasthanas",
        topics: [
          {
            id: "t-5-5",
            name: "Anekantavada (Multi-faceted Truth) & Syadvada",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-18",
            teacherRemarks: "",
            audioDuration: "11:15",
            meaningSnippet: "Reconciling diverse perspectives through non-absolutism."
          },
          {
            id: "t-5-6",
            name: "14 Gunasthanas (Stages of Spiritual Elevation)",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-22",
            teacherRemarks: "",
            audioDuration: "14:00",
            meaningSnippet: "From Mithyadrishti (delusion) to Ayoga Kevali (omniscience and liberation)."
          },
          {
            id: "t-5-7",
            name: "Preksha Dhyan & Kayotsarga Practice",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-08-25",
            teacherRemarks: "",
            audioDuration: "15:00",
            meaningSnippet: "Conscious bodily relaxation, breath perception, and psychic centers."
          }
        ]
      }
    ]
  }
};
