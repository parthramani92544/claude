export interface SyllabusTopic {
  id: string;
  name: string;
  status: 'Not Started' | 'Pending Teacher Review' | 'Approved' | 'Rework Required' | 'Not Approved';
  assignedBy: string;
  dateAssigned: string;
  teacherRemarks?: string;
}

export interface SyllabusChapter {
  id: string;
  name: string;
  topics: SyllabusTopic[];
}

export interface LevelSyllabus {
  levelId: string; // matches level selection like "Level 1: Basic Sutras & Stories" or similar prefix
  levelName: string;
  chapters: SyllabusChapter[];
}

export const syllabusData: Record<string, LevelSyllabus> = {
  "Level 1: Basic Sutras & Stories": {
    levelId: "Level 1",
    levelName: "Level 1: Bal Shala (Basic Sutras & Stories)",
    chapters: [
      {
        id: "ch-1-sutra",
        name: "Sutra",
        topics: [
          {
            id: "t-1-1",
            name: "Navkar Mantra - Line 1 & 2",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Excellent pronounciation and rhythm!"
          },
          {
            id: "t-1-2",
            name: "Navkar Mantra - Line 3 & 4",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Very fluent recital of Namo Ayariyanam and Namo Uvajjayanam."
          },
          {
            id: "t-1-3",
            name: "Navkar Mantra - Line 5 to 7",
            status: "Pending Teacher Review",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-12",
            teacherRemarks: ""
          },
          {
            id: "t-1-4",
            name: "Chattari Mangalam - Full",
            status: "Rework Required",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: "Please focus on the pronunciation of Kevali Pannatto Dhammo."
          }
        ]
      },
      {
        id: "ch-1-stavan",
        name: "Stavan & Stuti",
        topics: [
          {
            id: "t-1-5",
            name: "Mahavir Swami Stavan",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-20",
            teacherRemarks: ""
          },
          {
            id: "t-1-6",
            name: "Guru Vandana Stuti",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-22",
            teacherRemarks: ""
          }
        ]
      },
      {
        id: "ch-1-stories",
        name: "Jain Stories",
        topics: [
          {
            id: "t-1-7",
            name: "Story of King Shrenik",
            status: "Approved",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-10",
            teacherRemarks: "Fantastic retentive details and understood the moral extremely well."
          },
          {
            id: "t-1-8",
            name: "Story of Chandakaushik",
            status: "Not Started",
            assignedBy: "Samani Pragya ji",
            dateAssigned: "2026-06-25",
            teacherRemarks: ""
          }
        ]
      }
    ]
  },
  "Level 2: Jain Geography & Symbols": {
    levelId: "Level 2",
    levelName: "Level 2: Kumar Shala (Jain Geography & Symbols)",
    chapters: [
      {
        id: "ch-2-sutra",
        name: "Sutra Path",
        topics: [
          {
            id: "t-2-1",
            name: "Khamasama Sutra - Full",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Great execution of Vandium Javanijjae. Keep it up."
          },
          {
            id: "t-2-2",
            name: "Logassa Sutra - Gatha 1 & 2",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-08",
            teacherRemarks: "Proper speeds and breath pacing."
          },
          {
            id: "t-2-3",
            name: "Logassa Sutra - Gatha 3 & 4",
            status: "Pending Teacher Review",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: ""
          },
          {
            id: "t-2-4",
            name: "Logassa Sutra - Gatha 5 to 8",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-22",
            teacherRemarks: ""
          }
        ]
      },
      {
        id: "ch-2-symbols",
        name: "Jain Symbols & Flag",
        topics: [
          {
            id: "t-2-5",
            name: "The Jain Emblem Meaning",
            status: "Approved",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Excellent essay on the significance of Parasparopagraho Jivanam."
          },
          {
            id: "t-2-6",
            name: "The Panchrangi Flag Colors",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-26",
            teacherRemarks: ""
          }
        ]
      },
      {
        id: "ch-2-geo",
        name: "Jain Geography",
        topics: [
          {
            id: "t-2-7",
            name: "Three Worlds (Teen Lok) Structure",
            status: "Rework Required",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-18",
            teacherRemarks: "Please revise the dimensions of Madhya Lok and Adho Lok again."
          },
          {
            id: "t-2-8",
            name: "Siddha Shila Structure",
            status: "Not Started",
            assignedBy: "Samani Prasanna ji",
            dateAssigned: "2026-06-28",
            teacherRemarks: ""
          }
        ]
      }
    ]
  },
  "Level 3: Pratikraman & Advanced Vows": {
    levelId: "Level 3",
    levelName: "Level 3: Yuva Shala (Pratikraman & Philosophy)",
    chapters: [
      {
        id: "ch-3-pratikraman",
        name: "Pratikraman Sutras",
        topics: [
          {
            id: "t-3-1",
            name: "Iryavahiyam Sutra - Gatha 1 & 2",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-01",
            teacherRemarks: "Perfect recitation, crystal clear syllables and perfect pauses."
          },
          {
            id: "t-3-2",
            name: "Iryavahiyam Sutra - Gatha 3 & 4",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-05",
            teacherRemarks: "Very clear and fluent recitation."
          },
          {
            id: "t-3-3",
            name: "Namutthunam Sutra - Gatha 1 to 3",
            status: "Pending Teacher Review",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-10",
            teacherRemarks: ""
          },
          {
            id: "t-3-4",
            name: "Namutthunam Sutra - Gatha 4 to 6",
            status: "Rework Required",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-15",
            teacherRemarks: "Please focus on the pronunciation of 'Purisasihanam' and 'Purisavara-pundariyanam'."
          },
          {
            id: "t-3-5",
            name: "Khamasama Sutra - Complete",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-03",
            teacherRemarks: "Outstanding physical posture, clear speed, and deep devotion shown."
          }
        ]
      },
      {
        id: "ch-3-vows",
        name: "Advanced Philosophy & Vows",
        topics: [
          {
            id: "t-3-6",
            name: "12 Vows of a Shravak (Anuvratas)",
            status: "Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-08",
            teacherRemarks: "Deep comprehension of the 5 core Anuvratas shown in class discussion."
          },
          {
            id: "t-3-7",
            name: "Samayik Vidhi & Significance",
            status: "Not Approved",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-12",
            teacherRemarks: "Did not recall the 32 faults or the 'Karemi Bhante' vow text. Please study and re-attempt."
          },
          {
            id: "t-3-8",
            name: "Six Avashyakas (Daily Duties)",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-25",
            teacherRemarks: ""
          }
        ]
      },
      {
        id: "ch-3-philosophy",
        name: "Dravya & Tattva",
        topics: [
          {
            id: "t-3-9",
            name: "Six Dravyas (Substances)",
            status: "Pending Teacher Review",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-18",
            teacherRemarks: ""
          },
          {
            id: "t-3-10",
            name: "Nine Tattvas (Fundamentals)",
            status: "Not Started",
            assignedBy: "Pujya Samanji Dr. Shrutpragya ji",
            dateAssigned: "2026-06-28",
            teacherRemarks: ""
          }
        ]
      }
    ]
  }
};
