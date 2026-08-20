import { Student, QuickAccessItem, LiveClass, JainQuote, SutraDetails, QuizQuestion, AIQuiz } from './types';

export const initialStudent: Student = {
  name: "Aarav Shah",
  level: "Level 3 - Shravak Junior",
  completedLevels: ["Level 1 - Basic Sutras", "Level 2 - Jain Geography"],
  promotionStatus: "Learning",
  attendance: 94,
  gathasCount: 16,
  totalGathas: 20,
  attendanceScore: 250,
  gathaScore: 320,
  bonusPoints: 0, // We will compute total bonus points dynamically or just keep it 0 in initial and read from `totalBonusPoints`
  progressStatus: 'Excellent',
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
};

export const quickAccessItems: QuickAccessItem[] = [
  {
    id: "live_class",
    title: "Live Class",
    iconName: "Video",
    color: "rose",
    badge: "LIVE NOW",
    description: "Join Samayik Vidhi class"
  },
  {
    id: "sutra",
    title: "Sutra Path",
    iconName: "BookOpenCheck",
    color: "rose",
    description: "Recite & hear Sutras"
  },
  {
    id: "stavan",
    title: "Stavan & Stuti",
    iconName: "Volume2",
    color: "rose",
    description: "Devotional prayers"
  },
  {
    id: "niyam",
    title: "Daily Niyam",
    iconName: "CheckCircle",
    color: "rose",
    badge: "3/5 Done",
    description: "Log daily commitments"
  },
  {
    id: "games",
    title: "Trivia & Games",
    iconName: "Gamepad2",
    color: "rose",
    badge: "NEW",
    description: "Learn with fun quizzes"
  },
  {
    id: "profile",
    title: "My Profile",
    iconName: "User",
    color: "rose",
    description: "Badges & certificates"
  }
];

export const upcomingClass: LiveClass = {
  className: "Sutra Navtatva Chapter 3",
  teacher: "Pujya Samanji Dr. Shrutpragya ji",
  time: "Today, 05:30 PM",
  duration: "60 mins",
  isLiveNow: true,
  meetingLink: "https://zoom.us/mock-pathshala"
};

export const jainQuotes: JainQuote[] = [
  {
    text: "Jeeyo aur Jeene Do (Live and let live).",
    author: "Lord Mahavira",
    translation: "All living beings desire life; do not harm or cause any injury to them."
  },
  {
    text: "Ahimsa Paramo Dharma (Non-violence is the supreme path).",
    author: "Tirthankara Teachings",
    translation: "True religion begins with boundless compassion toward all existence."
  },
  {
    text: "Knowing others is intelligence, knowing oneself is spiritual wisdom.",
    author: "Acharya Kundkund Dev",
    translation: "Soul realization is the highest form of learning."
  }
];


export const sutrasList: SutraDetails[] = [
  {
    id: "navkar",
    name: "Navkar Mantra",
    prakrit: [
      "Namo Arihantanam",
      "Namo Siddhanam",
      "Namo Ayariyanam",
      "Namo Uvajjayanam",
      "Namo Loe Savva Sahunam",
      "Eso Pancha Namokaro, Savva Pavappanasano",
      "Mangalanam Cha Savvesim, Padhamam Havei Mangalam"
    ],
    english: [
      "I bow to the Arihants (destroyers of inner spiritual enemies).",
      "I bow to the Siddhas (liberated supreme souls).",
      "I bow to the Acharyas (spiritual leaders and preceptors).",
      "I bow to the Upadhyays (spiritual teachers and scholars).",
      "I bow to all Sadhus and Sadhvis (spiritual practitioners in the world).",
      "This fivefold bow destroys all sins and obstacles.",
      "And of all auspicious things, it is the foremost auspicious."
    ],
    hindi: [
      "मैं अरिहंतों (आंतरिक शत्रुओं के नाशक) को नमस्कार करता हूँ।",
      "मैं सिद्धों (मुक्त परम पवित्र आत्माओं) को नमस्कार करता हूँ।",
      "मैं आचार्यों (आध्यात्मिक गुरुओं और नायकों) को नमस्कार करता हूँ।",
      "मैं उपाध्यायों (ज्ञान और अध्यापन कराने वाले गुरुओं) को नमस्कार करता हूँ।",
      "मैं लोक के सभी साधु-साध्वियों को नमस्कार करता हूँ।",
      "यह पंच नमस्कार मंत्र सभी पापों और विघ्नों का समूल नाश करता है।",
      "और संपूर्ण कल्याणकारी मंगलों में यह सर्वप्रमुख प्रथम मंगल है।"
    ],
    gujarati: [
      "હું અરિહંતો (આંતરિક શત્રુઓનો નાશ કરનાર) ને નમસ્કાર કરું છું.",
      "હું સિદ્ધો (મુક્ત અને પરમ પવિત્ર આત્માઓ) ને નમસ્કાર કરું છું.",
      "હું આચાર્યો (આધ્યાત્મિક નેતાઓ અને ગુરુઓ) ને નમસ્કાર કરું છું.",
      "હું ઉપાધ્યાયો (જ્ઞાન અને શિક્ષણ આપતા ગુરુઓ) ને નમસ્કાર કરું છું.",
      "હું લોકના સર્વ સાધુ-સાધ્વીઓને નમસ્કાર કરું છું.",
      "આ પંચ નમસ્કાર મંત્ર સર્વ પાપો અને વિઘ્નોનો નાશ કરનાર છે.",
      "અને સર્વ કલ્યાણકારી મંગલોમાં આ પ્રથમ મુખ્ય મંગલ છે."
    ],
    meaning: "The Namokar Mantra is the supreme Jain prayer. It does not ask for personal favors; instead, it bows in deep gratitude and respect to the five supreme spiritual statures (Pancha Parameshthi). This purifies our consciousness.",
    audioDuration: "1:24",
    level: 1,
    category: "Morning Prayers"
  },
  {
    id: "chattari",
    name: "Chattari Mangalam",
    prakrit: [
      "Chattari Mangalam: Arihanta Mangalam, Siddha Mangalam, Sahu Mangalam, Kevali Pannatto Dhammo Mangalam.",
      "Chattari Loguttama: Arihanta Loguttama, Siddha Loguttama, Sahu Loguttama, Kevali Pannatto Dhammo Loguttama.",
      "Chattari Saranam Pavvajjami: Arihante Saranam Pavvajjami, Siddhe Saranam Pavvajjami, Sahu Saranam Pavvajjami, Kevali Pannattam Dhammam Saranam Pavvajjami."
    ],
    english: [
      "Four are auspicious in the universe: Arihants, Siddhas, Sadhus, and the compassionate religion expounded by the omniscient (Kevali).",
      "Four are supreme in the universe: Arihants, Siddhas, Sadhus, and the compassionate religion expounded by the omniscient.",
      "I take refuge in these four: I take refuge in the Arihants, the Siddhas, the Sadhus, and the compassionate religion expounded by the omniscient."
    ],
    hindi: [
      "लोक में चार मंगल रूप हैं: अरिहंत मंगल हैं, सिद्ध मंगल हैं, साधु मंगल हैं, और केवली प्ररूपित दयामयी धर्म मंगल है।",
      "लोक में चार सर्वोत्तम हैं: अरिहंत लोक-उत्तम हैं, सिद्ध लोक-उत्तम हैं, साधु लोक-उत्तम हैं, और केवली प्ररूपित धर्म लोक-उत्तम है।",
      "मैं इन चार की शरण स्वीकार करता हूँ: अरिहंतों की शरण, सिद्धों की शरण, साधुओं की शरण, और केवली प्ररूपित दयामयी धर्म की शरण।"
    ],
    gujarati: [
      "લોકમાં ચાર મંગલ રૂપ છે: અરિહંત મંગલ છે, સિદ્ધ મંગલ છે, સાધુ મંગલ છે, અને કેવલી પ્રરૂપિત દયામય ધર્મ મંગલ છે.",
      "લોકમાં ચાર સર્વોત્તમ છે: અરિહંત સર્વોત્તમ છે, સિદ્ધ સર્વોત્તમ છે, સાધુ સર્વોત્તમ છે, અને કેવલી પ્રરૂપિત ધર્મ સર્વોત્તમ છે.",
      "હું આ ચાર શરણ સ્વીકારું છું: અરિહંતોનું શરણ, સિદ્ધોનું શરણ, સાધુઓનું શરણ, અને કેવલી પ્રરૂપિત દયામય ધર્મનું શરણ."
    ],
    meaning: "This prayer is an affirmation of seeking shelter in the pure spiritual guides. It reminds us of the true compass of life — inner purity and non-violence.",
    audioDuration: "0:56",
    level: 1,
    category: "Morning Prayers"
  },
  {
    id: "khamasama",
    name: "Khamasama Sutra",
    prakrit: [
      "Ichchhami Khamasamano, Vandium Javanijjae, Nasihae,",
      "Tikkhutto, Ayahinam Payahinam, Vandami Namamsami,",
      "Sakkaremi Sammanemi, Kallanam Mangalam, Devayam Cheiyam, Pajjavasami."
    ],
    english: [
      "O forgiving monks! I wish to bow to you to the best of my bodily capability, avoiding all inappropriate movements.",
      "Circumambulating three times, keeping my right side toward you, I bow and offer my deep obeisance.",
      "I honor and respect you as beneficial, auspicious, divine, and pure form of consciousness."
    ],
    hindi: [
      "हे क्षमाशील संत! मैं शारीरिक रूप से अपनी पूरी शक्ति के साथ और दोषों का त्याग करके आपको वंदन करने की इच्छा करता हूँ।",
      "तीन बार प्रदक्षिणा करके, अपने दाएं अंगों को आपकी ओर झुकाते हुए, मैं श्रद्धापूर्वक वंदन और नमस्कार करता हूँ।",
      "मैं आपका सत्कार और सम्मान करता हूँ, आप परम कल्याणकारी, मंगलमयी, देवस्वरूप और परम पवित्र चेतना हैं।"
    ],
    gujarati: [
      "હે ક્ષમાશીલ સંત! હું શારીરિક રીતે મારી પૂરી શક્તિ સાથે અને સર્વ દોષોનો ત્યાગ કરી આપને વંદન કરવાની ઈચ્છા કરું છું.",
      "ત્રણ વાર પ્રદક્ષિણા કરીને, આપની જમણી બાજુ નમીને, હું શ્રદ્ધાપૂર્વક વંદન અને નમસ્કાર કરું છું.",
      "હું આપનો સત્કાર અને સન્માન કરું છું, આપ પરમ કલ્યાણકારી, મંગલમય, દેવસ્વરૂપ અને પરમ પવિત્ર ચેતના છો."
    ],
    meaning: "The Khamasama Sutra is recited to offer formal, respectful bows to Jain monks, nuns, or the temple idols. It practices deep humility and helps dissolve ego.",
    audioDuration: "1:10",
    level: 2,
    category: "Daily Rituals"
  },
  {
    id: "logassa",
    name: "Logassa Sutra",
    prakrit: [
      "Logassa Ujjoegare, Dhamma-Tithayare Jine, Arihante Kittamissam, Chauvisampri Kevali.",
      "Usabh-Majian Cha Vande, Sambhavam-Abhinandanan Cha Sumaim Cha, Paumappaham Supasam, Jinam Cha Chandappaham Vande.",
      "Suvaim Cha Pupphadhantam, Sial Sijjans Vasupujjam Cha, Vimal-Manantham Cha Jinam, Dharamam Santhin Cha Vandami."
    ],
    english: [
      "I praise and glorify the twenty-four Tirthankaras, who illuminate the cosmic universe and establish the sacred Ford of liberation.",
      "I bow in deep respect to Rishabha Dev, Ajita Nath, Sambhava Nath, Abhinandana Swami, Sumati Nath, Padmaprabha Swami, Suparshva Nath, and Chandraprabha Swami.",
      "I bow to Suvidhi Nath (Pushpadhanta), Shitala Nath, Shreyansa Nath, Vasupujya Swami, Vimala Nath, Ananta Nath, Dharma Nath, and Shanti Nath."
    ],
    hindi: [
      "मैं लोक को प्रकाशित करने वाले, धर्मतीर्थ की स्थापना करने वाले चौबीस केवलज्ञानी जिनों का कीर्तन करता हूँ।",
      "मैं ऋषभदेव, अजितनाथ, सम्भवनाथ, अभिनन्दननाथ, सुमतिनाथ, पद्मप्रभ, सुपार्श्वनाथ और चन्द्रप्रभ जिनेन्द्र को वंदन करता हूँ।",
      "मैं सुविधिनाथ, शीतलनाथ, श्रेयांसनाथ, वासुपूज्य, विमलनाथ, अनन्तनाथ, धर्मनाथ और शान्तिनाथ जिनेन्द्र को वंदन करता हूँ।"
    ],
    gujarati: [
      "હું લોકને પ્રકાશિત કરનાર, ધર્મતીર્થની સ્થાપના કરનાર ચોવીસ કેવળજ્ઞાની જિનોનું કીર્તન કરું છું.",
      "હું ઋષભદેવ, અજિતનાથ, સમ્ભવનાથ, અભિનન્દનનાથ, સુમતિનાથ, પદ્મપ્રભ, સુપાર્શ્વનાથ અને ચંદ્રપ્રભ જિનેન્દ્રને વંદન કરું છું.",
      "હું સુવિધિનાથ, શીતલનાથ, શ્રેયાંસનાથ, વાસુપૂજ્ય, વિમલનાથ, અનન્તનાથ, ધર્મનાથ અને શાંતિનાથ જિનેન્દ્રને વંદન કરું છું."
    ],
    meaning: "Also known as Chaturvinshati Stava, this is a hymn of praise dedicated to the 24 Tirthankaras. It brings immense joy, peace, and spiritual light to the soul.",
    audioDuration: "2:05",
    level: 2,
    category: "Devotional"
  },
  {
    id: "iryavahiyam",
    name: "Iryavahiyam Sutra",
    prakrit: [
      "Ichchha-karena Sandisah Bhagavan, Iriya-vahiyam Padi-kkamami? Ichchham, Ichchhami Padi-kkamium.",
      "Iriya-vahiyae, Viraha-nae, Gamana-gamane,",
      "Panakkamane, Biya-kamane, Hariya-kamane, Osa-uttinga-panaga-daga-matti-makkada-santana-sankamane."
    ],
    english: [
      "By your permission, O spiritual master, may I repent for the transgressions and errors committed while walking? Yes, I wish to repent.",
      "For any injury or pain caused to tiny living beings during my walking and general physical movements.",
      "By treading on insects, crushing seeds, breaking green plants, stepping on dew, anthills, cobwebs, or walking through wet clay."
    ],
    hindi: [
      "हे पूज्य गुरुदेव! आपकी आज्ञा से क्या मैं चलने-फिरने के दोषों का प्रतिक्रमण (प्रायश्चित) करूँ? हाँ, मैं प्रतिक्रमण करना चाहता हूँ।",
      "चलने-फिरने में जो भी जीवों की विराधना हुई हो, दुःख पहुँचा हो, मैं उन सभी दोषों की आलोचना करता हूँ।",
      "चलते समय जीवों को रौंदने, बीजों, हरी वनस्पति, ओस, चींटी के घरों, मकड़ी के जालों या गीली मिट्टी को दबाने से जो भी दोष लगा हो।"
    ],
    gujarati: [
      "હે પૂજ્ય ગુરુદેવ! આપની આજ્ઞાથી શું હું ચાલવા-ફરવાના દોષોનું પ્રતિક્રમણ (પશ્ચાત્તાપ) કરું? હા, હું પ્રતિક્રમણ કરવા ઈચ્છું છું.",
      "ચાલવા-ફરવામાં જે કોઈ જીવોની વિરાધના થઈ હોય, દુઃખ પહોંચ્યું હોય, હું તે સર્વ દોષોની આલોચના કરું છું.",
      "ચાલતી વખતે જીવોને કચડવા, બીજ, લીલી વનસ્પતિ, ઝાકળ, કીડીના ઘર, કરોળિયાના જાળા કે ભીની માટીને દબાવવાથી જે કોઈ દોષ લાગ્યો હોય."
    ],
    meaning: "This beautiful repentance prayer is recited to ask for forgiveness from all living beings for any unintentional injury caused during walking and breathing.",
    audioDuration: "1:45",
    level: 3,
    category: "Repentance"
  },
  {
    id: "namutthunam",
    name: "Namutthunam Sutra",
    prakrit: [
      "Namutthunam Arihantanam, Bhagavamtanam.",
      "Aigarananam, Titthagaranam, Sayamsambuddhanam.",
      "Purisuttamanam, Purisasihanam, Purisavara-pundariyanam, Purisavara-gandhahatthinam."
    ],
    english: [
      "My supreme obeisance to the Arihants (destroyers of karma) and Bhagawants (illustrious spiritual masters).",
      "The prime initiators of the path of liberation, creators of the holy Ford, the self-enlightened supreme beings.",
      "The highest among human beings, brave lions among men, pure white lotuses among men, majestic scent-elephants of the path."
    ],
    hindi: [
      "मेरा अरिहंतों को और भगवंतों (परम पूज्य जिनों) को सर्वोच्च नमस्कार हो।",
      "जो धर्म और मोक्ष मार्ग के आदिकर्ता हैं, तीर्थंकर हैं और स्वयं बोधिप्राप्त संबुद्ध देव हैं।",
      "जो पुरुषों में सर्वोत्कृष्ट हैं, पुरुषों में पराक्रमी सिंह समान हैं, मानवों में श्रेष्ठ श्वेत कमल समान हैं और गंधहस्ती समान हैं।"
    ],
    gujarati: [
      "મારું અરિહંતોને અને ભગવંતોને (પરમ પૂજ્ય જિનોને) સર્વોચ્ચ નમસ્કાર હો.",
      "જે ધર્મ અને મોક્ષ માર્ગના આદિકર્તા છે, તીર્થંકર છે અને સ્વયં બોધિપ્રાપ્ત સંબુદ્ધ દેવ છે.",
      "જે પુરુષોમાં સર્વોત્કૃષ્ટ છે, પુરુષોમાં પરાક્રમી સિંહ સમાન છે, માનવોમાં શ્રેષ્ઠ શ્વેત કમળ સમાન છે અને ગંધહસ્તી સમાન છે."
    ],
    meaning: "Also known as Shakra Stava, this is a legendary hymn of praise sung by the king of heavenly beings (Indra) to glorify the spiritual stature of Tirthankaras.",
    audioDuration: "2:30",
    level: 3,
    category: "Devotional"
  }
];


export const pathshalaTrivia: QuizQuestion[] = [
  {
    question: "How many Tirthankaras are there in the current half-cycle (Avasarpini)?",
    options: ["12", "24", "108", "4"],
    correctAnswer: 1,
    explanation: "There are exactly 24 Tirthankaras in every half-cycle of time. Lord Adinath was the first, and Lord Mahavira was the 24th."
  },
  {
    question: "Which of these is the first of the five great vows (Mahavratas) in Jainism?",
    options: ["Satya (Truth)", "Ahimsa (Non-violence)", "Asteya (Non-stealing)", "Aparigraha (Non-possession)"],
    correctAnswer: 1,
    explanation: "Ahimsa (non-injury to all living beings) is the foundation of all Jain ethics and spiritual advancement."
  },
  {
    question: "What does the word 'Jina' mean, from which 'Jain' is derived?",
    options: ["The Monarch", "The Conqueror of inner enemies", "The Heavenly Being", "The Scholar"],
    correctAnswer: 1,
    explanation: "Jina literally translates to 'Conqueror' — referring to someone who has conquered anger, ego, deceit, and greed."
  }
];

export const INITIAL_AI_QUIZZES: AIQuiz[] = [
  {
    id: "iryavahiyam_quiz",
    title: "Iryavahiyam Sutra Repentance Quiz",
    relatedContentName: "Iryavahiyam Sutra",
    type: "Sutra",
    category: "Repentance",
    estimatedTime: "5 mins",
    difficulty: "Advanced",
    level: 3,
    publishedAt: "Published 2 days ago",
    questions: [
      {
        question: "What is the primary purpose of reciting the Iryavahiyam Sutra?",
        type: "mcq",
        options: ["Asking for material wealth", "Repenting for injury caused to living beings while walking", "Praising the Tirthankaras", "Seeking courage and strength"],
        correctAnswer: 1,
        explanation: "The Iryavahiyam Sutra is recited to repent for any unintentional injury or pain caused to microscopic or small living beings while walking."
      },
      {
        question: "The Iryavahiyam Sutra asks for forgiveness for crushing seeds (Biya-kamane) and green plants (Hariya-kamane).",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Yes, the sutra explicitly mentions treading on seeds (Biya-kamane) and green plants (Hariya-kamane) during our walking movements."
      },
      {
        question: "Complete the blank from the Iryavahiyam Sutra: 'gamana-gamane, panakkamane, biya-kamane, _______-kamane...'",
        type: "fill",
        options: ["hariya", "sutra", "vande", "navkar"],
        correctAnswer: "hariya",
        explanation: "The correct term is 'hariya-kamane', which refers to stepping on green plants, causing pain to one-sensed living beings."
      }
    ]
  },
  {
    id: "namutthunam_quiz",
    title: "Namutthunam Sutra Spiritual Praise",
    relatedContentName: "Namutthunam Sutra",
    type: "Sutra",
    category: "Devotional",
    estimatedTime: "6 mins",
    difficulty: "Advanced",
    level: 3,
    publishedAt: "Published 4 days ago",
    questions: [
      {
        question: "By what other name is the Namutthunam Sutra famously known?",
        type: "mcq",
        options: ["Chaturvinshati Stava", "Shakra Stava", "Pratikraman Sutra", "Kalyan Mandir"],
        correctAnswer: 1,
        explanation: "It is known as Shakra Stava because it was first sung by Shakra (King of Indra/heavenly beings) to praise Lord Arihant."
      },
      {
        question: "The original Namutthunam Sutra is composed in standard Sanskrit language.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. The original Namutthunam Sutra is composed in Prakrit, which was the language of the common people in ancient India."
      },
      {
        question: "In the sutra, the Tirthankaras are described as 'gandhahatthinam', which means majestic _______ of the spiritual path.",
        type: "fill",
        options: ["scent-elephants", "lions", "lotuses", "guides"],
        correctAnswer: "scent-elephants",
        explanation: "Purisavara-gandhahatthinam means 'scent-elephants among men', representing supreme spiritual strength and guidance."
      }
    ]
  },
  {
    id: "maitribhav_quiz",
    title: "Maitri Bhavnu Compassion Reflection",
    relatedContentName: "Maitri Bhavnu Pavitra Jharnu",
    type: "Stavan",
    category: "Ethics",
    estimatedTime: "4 mins",
    difficulty: "Intermediate",
    level: 3,
    publishedAt: "Published 1 week ago",
    questions: [
      {
        question: "What virtue does the line 'Maitri Bhavnu Pavitra Jharnu' encourage?",
        type: "mcq",
        options: ["Boundless friendship and loving-kindness", "Rigid physical penance", "Strict silence", "Acquisition of holy scriptures"],
        correctAnswer: 0,
        explanation: "Maitri Bhavnu means the stream of friendliness, which should flow constantly in our hearts toward all living beings."
      },
      {
        question: "According to the song, we should feel anger and hatred toward people who act badly.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. The song teaches us to feel 'Madhyastha Bhav' (neutrality/equanimity) rather than anger toward those who behave wrongly."
      },
      {
        question: "The song asks that our heart always beat with the spirit of _______ (compassion) for all suffering beings.",
        type: "fill",
        options: ["Anukampa", "Moha", "Krodha", "Lobha"],
        correctAnswer: "Anukampa",
        explanation: "Anukampa (compassion) is the core virtue that Jains seek to cultivate toward all suffering beings."
      }
    ]
  },
  {
    id: "mahavir_life_quiz",
    title: "Life & Sanyam of Lord Mahavira",
    relatedContentName: "Mahavir Swami Nu Stavan",
    type: "Bhagwan Stories",
    category: "History",
    estimatedTime: "5 mins",
    difficulty: "Advanced",
    level: 3,
    publishedAt: "Published 3 days ago",
    questions: [
      {
        question: "What was Lord Mahavira's birth name?",
        type: "mcq",
        options: ["Siddharth", "Vardhaman", "Rishabha", "Neminath"],
        correctAnswer: 1,
        explanation: "Lord Mahavira was named Vardhaman ('he who grows/increases') because his parents' wealth and kingdom flourished after his conception."
      },
      {
        question: "Lord Mahavira spent exactly 12 years in deep meditation and silence before attaining Kevalgyan.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. He spent over 12 years in rigorous meditation, fasting, silence, and severe austerities to shed all kashayas and karmas."
      },
      {
        question: "The name of Lord Mahavira's father was King _______.",
        type: "fill",
        options: ["Siddharth", "Nandivardhan", "Sudarshan", "Shrenik"],
        correctAnswer: "Siddharth",
        explanation: "King Siddharth of Kundgram was the father of Lord Mahavira."
      }
    ]
  },
  {
    id: "navkar_quiz",
    title: "Navkar Mantra Core Meaning",
    relatedContentName: "Navkar Mantra",
    type: "Sutra",
    category: "Morning Prayers",
    estimatedTime: "3 mins",
    difficulty: "Beginner",
    level: 1,
    publishedAt: "Published 5 days ago",
    questions: [
      {
        question: "Who is praised first in the Navkar Mantra?",
        type: "mcq",
        options: ["Siddhas", "Arihants", "Acharyas", "Sadhus"],
        correctAnswer: 1,
        explanation: "Arihants (the living enlightened teachers) are praised first because they guide us to the path of liberation."
      },
      {
        question: "The Navkar Mantra is dedicated to a specific Jain Tirthankara by name.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. The Navkar Mantra is a non-sectarian prayer bowing to the qualities of five supreme spiritual stages (Pancha Parameshthi), not a single individual."
      }
    ]
  },
  {
    id: "chattari_quiz",
    title: "Chattari Mangalam Four Refuges",
    relatedContentName: "Chattari Mangalam",
    type: "Sutra",
    category: "Morning Prayers",
    estimatedTime: "3 mins",
    difficulty: "Beginner",
    level: 1,
    publishedAt: "Published 6 days ago",
    questions: [
      {
        question: "How many auspicious entities are listed in Chattari Mangalam?",
        type: "mcq",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: 2,
        explanation: "Four are auspicious: Arihants, Siddhas, Sadhus, and the compassionate religion expounded by the omniscient."
      },
      {
        question: "We seek shelter in five different places in the Chattari Mangalam prayer.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. We seek shelter (saranam pavvajjami) in exactly four (Chattari) refuges."
      }
    ]
  },
  {
    id: "khamasama_quiz",
    title: "Khamasama Bow of Humility",
    relatedContentName: "Khamasama Sutra",
    type: "Sutra",
    category: "Daily Rituals",
    estimatedTime: "4 mins",
    difficulty: "Intermediate",
    level: 2,
    publishedAt: "Published 1 week ago",
    questions: [
      {
        question: "To whom is the Khamasama Sutra recited to offer respectful bows?",
        type: "mcq",
        options: ["Jain monks and nuns", "Only family members", "Only Tirthankaras", "All friends"],
        correctAnswer: 0,
        explanation: "The Khamasama Sutra is recited to offer formal, respectful bows to Jain monks, nuns, or temple idols."
      },
      {
        question: "The Khamasama Sutra is recited while circumambulating exactly three times.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. It mentions Tikkhutto (circulating three times) to show deep reverence."
      }
    ]
  },
  {
    id: "logassa_quiz",
    title: "Logassa Sutra 24 Tirthankaras",
    relatedContentName: "Logassa Sutra",
    type: "Sutra",
    category: "Devotional",
    estimatedTime: "5 mins",
    difficulty: "Intermediate",
    level: 2,
    publishedAt: "Published 1 week ago",
    questions: [
      {
        question: "How many Tirthankaras are praised in the Logassa Sutra?",
        type: "mcq",
        options: ["12", "24", "108", "5"],
        correctAnswer: 1,
        explanation: "Logassa Sutra (Chaturvinshati Stava) is a hymn of praise dedicated to all twenty-four Tirthankaras of the current era."
      },
      {
        question: "The Logassa Sutra is commonly recited daily during Samayik and prayers.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. It is a fundamental devotional prayer recited daily to purify consciousness by thinking about the pure qualities of the 24 Tirthankaras."
      }
    ]
  },
  {
    id: "uvasaggaharam_quiz",
    title: "Uvasaggaharam Stotra Protection",
    relatedContentName: "Uvasaggaharam Stotra",
    type: "Stavan",
    category: "Devotional",
    estimatedTime: "5 mins",
    difficulty: "Advanced",
    level: 3,
    publishedAt: "Published 2 days ago",
    questions: [
      {
        question: "To which Tirthankara is the Uvasaggaharam Stotra dedicated?",
        type: "mcq",
        options: ["Lord Mahavira", "Lord Parshvanath", "Lord Rishabhdev", "Lord Neminath"],
        correctAnswer: 1,
        explanation: "The Uvasaggaharam Stotra, composed by Acharya Bhadrabahu Swami, is dedicated to Lord Parshvanath."
      },
      {
        question: "Reciting Uvasaggaharam is believed to remove obstacles and negative energies.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Uvasagga means 'obstacles/troubles' and Haram means 'remover'."
      }
    ]
  },
  {
    id: "bhaktamar_quiz",
    title: "Bhaktamar Stotra Divine Hymn",
    relatedContentName: "Bhaktamar Stotra",
    type: "Stavan",
    category: "Devotional",
    estimatedTime: "6 mins",
    difficulty: "Advanced",
    level: 3,
    publishedAt: "Published 3 days ago",
    questions: [
      {
        question: "Who composed the world-famous Bhaktamar Stotra?",
        type: "mcq",
        options: ["Acharya Manatunga Suri", "Acharya Hemachandra", "Acharya Haribhadra", "Acharya Kundkund"],
        correctAnswer: 0,
        explanation: "Acharya Manatunga Suri composed the Bhaktamar Stotra praising the first Tirthankara, Lord Adinath (Rishabhdev)."
      },
      {
        question: "The Bhaktamar Stotra was composed in praise of Lord Parshvanath.",
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. It is dedicated to the first Tirthankara, Lord Rishabhdev (Adinath)."
      }
    ]
  }
];

