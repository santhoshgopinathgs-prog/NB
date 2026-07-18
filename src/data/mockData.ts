export type Language = 'EN' | 'KN';

export const translations = {
  EN: {
    home: 'Home',
    learn: 'Learn',
    practice: 'Practice',
    top: 'Top',
    profile: 'Profile',
    dailyChallenge: 'Daily Challenge',
    xpProgressBar: 'XP Progress',
    streak: 'Day Streak',
    recommended: 'Recommended Modules',
    math: 'Mathematics',
    science: 'Science',
    digitalSkills: 'Digital Skills',
    startQuiz: 'Start Quiz',
    completed: 'Completed',
    leaderboard: 'Leaderboard',
    achievements: 'Achievements',
    certificates: 'Certificates',
    goodEvening: 'Good Evening',
    classText: 'Class',
    quizzes: 'Quizzes',
    questions: 'Questions',
    earnUpTo: 'Earn up to',
    xp: 'XP',
    question: 'Question',
    of: 'of',
    confirm: 'Confirm',
    nextQuestion: 'Next Question →',
    finishQuiz: 'Finish Quiz',
    greatJob: 'Great Job!',
    completedQuizEarned: 'You completed this practice test and earned',
    totalXp: 'Total XP:',
    backToPracticeList: 'Back to Practice List',
    youEarnedThe: 'You earned the',
    certificate: 'Certificate!',
    reviewQuiz: 'Review Quiz'
  },
  KN: {
    home: 'ಮುಖಪುಟ',
    learn: 'ಕಲಿಯಿರಿ',
    practice: 'ಅಭ್ಯಾಸ',
    top: 'ಟಾಪ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    dailyChallenge: 'ದೈನಂದಿನ ಸವಾಲು',
    xpProgressBar: 'XP ಪ್ರಗತಿ',
    streak: 'ದಿನದ ಸ್ಟ್ರೀಕ್',
    recommended: 'ಶಿಫಾರಸು ಮಾಡಿದ ಮಾಡ್ಯೂಲ್‌ಗಳು',
    math: 'ಗಣಿತ',
    science: 'ವಿಜ್ಞಾನ',
    digitalSkills: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು',
    startQuiz: 'ರಸಪ್ರಶ್ನೆ ಪ್ರಾರಂಭಿಸಿ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    leaderboard: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
    achievements: 'ಸಾಧನೆಗಳು',
    certificates: 'ಪ್ರಮಾಣಪತ್ರಗಳು',
    goodEvening: 'ಶುಭ ಸಂಜೆ',
    classText: 'ತರಗತಿ',
    quizzes: 'ರಸಪ್ರಶ್ನೆಗಳು',
    questions: 'ಪ್ರಶ್ನೆಗಳು',
    earnUpTo: 'ಗಳಿಸಿ',
    xp: 'XP',
    question: 'ಪ್ರಶ್ನೆ',
    of: 'ರ',
    confirm: 'ಖಚಿತಪಡಿಸಿ',
    nextQuestion: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ →',
    finishQuiz: 'ರಸಪ್ರಶ್ನೆ ಮುಗಿಸಿ',
    greatJob: 'ಉತ್ತಮ ಕೆಲಸ!',
    completedQuizEarned: 'ನೀವು ಈ ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ ಮತ್ತು ಗಳಿಸಿದ್ದೀರಿ',
    totalXp: 'ಒಟ್ಟು XP:',
    backToPracticeList: 'ಅಭ್ಯಾಸ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ',
    youEarnedThe: 'ನೀವು ಗಳಿಸಿದ್ದೀರಿ',
    certificate: 'ಪ್ರಮಾಣಪತ್ರ!',
    reviewQuiz: 'ರಸಪ್ರಶ್ನೆ ವಿಮರ್ಶಿಸಿ'
  }
};

export const mockUser = {
  name: 'Ananya S.',
  class: 9,
  xp: 1250,
  streak: 12,
  rank: 42
};

export const MOCK_MATH_QUESTIONS = [
  { question_en: 'What is the standard form of a quadratic equation?', question_kn: 'ವರ್ಗ ಸಮೀಕರಣದ ಪ್ರಮಾಣಿತ ರೂಪ ಯಾವುದು?', options_en: ['ax² + bx + c = 0', 'ax + b = 0', 'a² + b² = c²', 'None of the above'], options_kn: ['ax² + bx + c = 0', 'ax + b = 0', 'a² + b² = c²', 'ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ'], correctAnswer: 0 },
  { question_en: 'What is the value of pi (π) to two decimal places?', question_kn: 'ಪೈ (π) ನ ಮೌಲ್ಯ ಎರಡು ದಶಮಾಂಶ ಸ್ಥಾನಗಳಿಗೆ ಎಷ್ಟು?', options_en: ['3.14', '3.16', '3.12', '3.18'], options_kn: ['3.14', '3.16', '3.12', '3.18'], correctAnswer: 0 },
  { question_en: 'If 2x = 10, what is the value of x?', question_kn: '2x = 10 ಆದರೆ, x ನ ಮೌಲ್ಯ ಎಷ್ಟು?', options_en: ['5', '10', '2', '20'], options_kn: ['5', '10', '2', '20'], correctAnswer: 0 },
  { question_en: 'What is 15% of 200?', question_kn: '200 ರ 15% ಎಷ್ಟು?', options_en: ['15', '20', '30', '45'], options_kn: ['15', '20', '30', '45'], correctAnswer: 2 },
  { question_en: 'What is the square root of 144?', question_kn: '144 ರ ವರ್ಗಮೂಲ ಎಷ್ಟು?', options_en: ['10', '11', '12', '14'], options_kn: ['10', '11', '12', '14'], correctAnswer: 2 },
  { question_en: 'Solve for y: y - 5 = 15', question_kn: 'y ಗಾಗಿ ಬಿಡಿಸಿ: y - 5 = 15', options_en: ['10', '15', '20', '25'], options_kn: ['10', '15', '20', '25'], correctAnswer: 2 },
  { question_en: 'What is the area of a rectangle with length 5 and width 4?', question_kn: 'ಉದ್ದ 5 ಮತ್ತು ಅಗಲ 4 ಇರುವ ಆಯತದ ವಿಸ್ತೀರ್ಣ ಎಷ್ಟು?', options_en: ['9', '18', '20', '40'], options_kn: ['9', '18', '20', '40'], correctAnswer: 2 },
  { question_en: 'What is the next prime number after 7?', question_kn: '7 ರ ನಂತರದ ಅವಿಭಾಜ್ಯ ಸಂಖ್ಯೆ ಯಾವುದು?', options_en: ['8', '9', '10', '11'], options_kn: ['8', '9', '10', '11'], correctAnswer: 3 },
  { question_en: 'What is 5 factorial (5!)?', question_kn: '5 ಫ್ಯಾಕ್ಟೋರಿಯಲ್ (5!) ಎಷ್ಟು?', options_en: ['25', '100', '120', '125'], options_kn: ['25', '100', '120', '125'], correctAnswer: 2 },
  { question_en: 'What is the sum of angles in a triangle?', question_kn: 'ತ್ರಿಕೋನದಲ್ಲಿ ಕೋನಗಳ ಮೊತ್ತ ಎಷ್ಟು?', options_en: ['90', '180', '270', '360'], options_kn: ['90', '180', '270', '360'], correctAnswer: 1 },
  { question_en: 'What is 2 cubed (2³)?', question_kn: '2 ರ ಘನ (2³) ಎಷ್ಟು?', options_en: ['4', '6', '8', '16'], options_kn: ['4', '6', '8', '16'], correctAnswer: 2 },
  { question_en: 'How many degrees are in a right angle?', question_kn: 'ಲಂಬಕೋನದಲ್ಲಿ ಎಷ್ಟು ಡಿಗ್ರಿಗಳಿವೆ?', options_en: ['45', '90', '180', '360'], options_kn: ['45', '90', '180', '360'], correctAnswer: 1 },
  { question_en: 'What is the greatest common divisor of 12 and 18?', question_kn: '12 ಮತ್ತು 18 ರ ಅತಿದೊಡ್ಡ ಸಾಮಾನ್ಯ ಭಾಜಕ ಎಷ್ಟು?', options_en: ['2', '3', '6', '9'], options_kn: ['2', '3', '6', '9'], correctAnswer: 2 },
  { question_en: 'What is the square of 15?', question_kn: '15 ರ ವರ್ಗ ಎಷ್ಟು?', options_en: ['125', '150', '225', '300'], options_kn: ['125', '150', '225', '300'], correctAnswer: 2 },
  { question_en: 'What is 1/2 expressed as a percentage?', question_kn: 'ಶೇಕಡಾವಾರು 1/2 ಎಷ್ಟು?', options_en: ['20%', '25%', '50%', '100%'], options_kn: ['20%', '25%', '50%', '100%'], correctAnswer: 2 },
  { question_en: 'What is 50% of 80?', question_kn: '80 ರ 50% ಎಷ್ಟು?', options_en: ['30', '40', '50', '60'], options_kn: ['30', '40', '50', '60'], correctAnswer: 1 },
  { question_en: 'What is 7 squared?', question_kn: '7 ರ ವರ್ಗ ಎಷ್ಟು?', options_en: ['14', '42', '49', '56'], options_kn: ['14', '42', '49', '56'], correctAnswer: 2 },
  { question_en: 'If a = 3, what is 2a + 4?', question_kn: 'a = 3 ಆದರೆ, 2a + 4 ಎಷ್ಟು?', options_en: ['8', '10', '12', '14'], options_kn: ['8', '10', '12', '14'], correctAnswer: 1 },
  { question_en: 'What is the square root of 81?', question_kn: '81 ರ ವರ್ಗಮೂಲ ಎಷ್ಟು?', options_en: ['7', '8', '9', '10'], options_kn: ['7', '8', '9', '10'], correctAnswer: 2 },
  { question_en: 'What is 3/4 expressed as a decimal?', question_kn: '3/4 ನ್ನು ದಶಮಾಂಶವಾಗಿ ವ್ಯಕ್ತಪಡಿಸಿ?', options_en: ['0.25', '0.50', '0.75', '0.80'], options_kn: ['0.25', '0.50', '0.75', '0.80'], correctAnswer: 2 },
  { question_en: 'What is the perimeter of a square with side length 5?', question_kn: 'ಬದಿಯ ಉದ್ದ 5 ಇರುವ ಚೌಕದ ಸುತ್ತಳತೆ ಎಷ್ಟು?', options_en: ['10', '15', '20', '25'], options_kn: ['10', '15', '20', '25'], correctAnswer: 2 },
  { question_en: 'How many sides does a hexagon have?', question_kn: 'ಷಡ್ಭುಜಾಕೃತಿಯು ಎಷ್ಟು ಬದಿಗಳನ್ನು ಹೊಂದಿದೆ?', options_en: ['5', '6', '7', '8'], options_kn: ['5', '6', '7', '8'], correctAnswer: 1 },
  { question_en: 'What is 12 multiplied by 8?', question_kn: '12 ನ್ನು 8 ರಿಂದ ಗುಣಿಸಿದರೆ ಎಷ್ಟು?', options_en: ['86', '96', '106', '116'], options_kn: ['86', '96', '106', '116'], correctAnswer: 1 },
  { question_en: 'What is the value of x if 3x = 21?', question_kn: '3x = 21 ಆದರೆ x ನ ಮೌಲ್ಯ ಎಷ್ಟು?', options_en: ['6', '7', '8', '9'], options_kn: ['6', '7', '8', '9'], correctAnswer: 1 },
  { question_en: 'What is the least common multiple of 4 and 6?', question_kn: '4 ಮತ್ತು 6 ರ ಲ.ಸಾ.ಅ (LCM) ಎಷ್ಟು?', options_en: ['10', '12', '24', '36'], options_kn: ['10', '12', '24', '36'], correctAnswer: 1 },
  { question_en: 'What is the cube root of 27?', question_kn: '27 ರ ಘನಮೂಲ ಎಷ್ಟು?', options_en: ['2', '3', '4', '9'], options_kn: ['2', '3', '4', '9'], correctAnswer: 1 },
  { question_en: 'What is 2 to the power of 4?', question_kn: '2 ರ 4 ನೇ ಘಾತ ಎಷ್ಟು?', options_en: ['8', '12', '16', '32'], options_kn: ['8', '12', '16', '32'], correctAnswer: 2 },
  { question_en: 'What is the interior angle of an equilateral triangle?', question_kn: 'ಸಮಬಾಹು ತ್ರಿಕೋನದ ಒಳ ಕೋನ ಎಷ್ಟು?', options_en: ['45', '60', '90', '120'], options_kn: ['45', '60', '90', '120'], correctAnswer: 1 },
  { question_en: 'If y - 10 = 0, what is y?', question_kn: 'y - 10 = 0 ಆದರೆ y ನ ಮೌಲ್ಯ ಎಷ್ಟು?', options_en: ['0', '5', '10', '20'], options_kn: ['0', '5', '10', '20'], correctAnswer: 2 },
  { question_en: 'What is 1/3 of 90?', question_kn: '90 ರ 1/3 ಎಷ್ಟು?', options_en: ['20', '30', '40', '45'], options_kn: ['20', '30', '40', '45'], correctAnswer: 1 }
];

export const MOCK_SCIENCE_QUESTIONS = [
  { question_en: 'What is the chemical symbol for water?', question_kn: 'ನೀರಿನ ರಾಸಾಯನಿಕ ಸಂಕೇತವೇನು?', options_en: ['HO', 'H2O', 'O2', 'CO2'], options_kn: ['HO', 'H2O', 'O2', 'CO2'], correctAnswer: 1 },
  { question_en: 'Which planet is known as the Red Planet?', question_kn: 'ಕೆಂಪು ಗ್ರಹ ಎಂದು ಯಾವ ಗ್ರಹವನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ?', options_en: ['Earth', 'Mars', 'Jupiter', 'Venus'], options_kn: ['ಭೂಮಿ', 'ಮಂಗಳ', 'ಗುರು', 'ಶುಕ್ರ'], correctAnswer: 1 },
  { question_en: 'Which gas do plants absorb during photosynthesis?', question_kn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಸಮಯದಲ್ಲಿ ಸಸ್ಯಗಳು ಯಾವ ಅನಿಲವನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತವೆ?', options_en: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], options_kn: ['ಆಮ್ಲಜನಕ', 'ಸಾರಜನಕ', 'ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್', 'ಹೈಡ್ರೋಜನ್'], correctAnswer: 2 },
  { question_en: 'What is the boiling point of water in Celsius?', question_kn: 'ಸೆಲ್ಸಿಯಸ್‌ನಲ್ಲಿ ನೀರಿನ ಕುದಿಯುವ ಬಿಂದು ಎಷ್ಟು?', options_en: ['50', '90', '100', '120'], options_kn: ['50', '90', '100', '120'], correctAnswer: 2 },
  { question_en: 'What is the largest mammal on Earth?', question_kn: 'ಭೂಮಿಯ ಮೇಲಿನ ಅತಿದೊಡ್ಡ ಸಸ್ತನಿ ಯಾವುದು?', options_en: ['Elephant', 'Blue Whale', 'Giraffe', 'Shark'], options_kn: ['ಆನೆ', 'ನೀಲಿ ತಿಮಿಂಗಿಲ', 'ಜಿರಾಫೆ', 'ಶಾರ್ಕ್'], correctAnswer: 1 },
  { question_en: 'What is the chemical symbol for Gold?', question_kn: 'ಚಿನ್ನದ ರಾಸಾಯನಿಕ ಸಂಕೇತವೇನು?', options_en: ['Ag', 'Au', 'Go', 'Gd'], options_kn: ['Ag', 'Au', 'Go', 'Gd'], correctAnswer: 1 },
  { question_en: 'What is the powerhouse of the cell?', question_kn: 'ಕೋಶದ ಪವರ್ ಹೌಸ್ ಯಾವುದು?', options_en: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'], options_kn: ['ನ್ಯೂಕ್ಲಿಯಸ್', 'ಮೈಟೊಕಾಂಡ್ರಿಯಾ', 'ರೈಬೋಸೋಮ್', 'ಸೈಟೋಪ್ಲಾಸಂ'], correctAnswer: 1 },
  { question_en: 'What force keeps us on Earth?', question_kn: 'ನಮ್ಮನ್ನು ಭೂಮಿಯ ಮೇಲಿರಿಸುವ ಶಕ್ತಿ ಯಾವುದು?', options_en: ['Friction', 'Magnetism', 'Gravity', 'Momentum'], options_kn: ['ಘರ್ಷಣೆ', 'ಕಾಂತೀಯತೆ', 'ಗುರುತ್ವಾಕರ್ಷಣೆ', 'ಮೊಮೆಂಟಮ್'], correctAnswer: 2 },
  { question_en: 'Which planet is closest to the sun?', question_kn: 'ಸೂರ್ಯನಿಗೆ ಹತ್ತಿರವಾದ ಗ್ರಹ ಯಾವುದು?', options_en: ['Venus', 'Mercury', 'Earth', 'Mars'], options_kn: ['ಶುಕ್ರ', 'ಬುಧ', 'ಭೂಮಿ', 'ಮಂಗಳ'], correctAnswer: 1 },
  { question_en: 'What type of acid is found in lemons?', question_kn: 'ನಿಂಬೆಹಣ್ಣಿನಲ್ಲಿ ಯಾವ ಆಮ್ಲ ಕಂಡುಬರುತ್ತದೆ?', options_en: ['Lactic', 'Citric', 'Acetic', 'Hydrochloric'], options_kn: ['ಲ್ಯಾಕ್ಟಿಕ್', 'ಸಿಟ್ರಿಕ್', 'ಅಸಿಟಿಕ್', 'ಹೈಡ್ರೋಕ್ಲೋರಿಕ್'], correctAnswer: 1 },
  { question_en: 'What is the speed of light?', question_kn: 'ಬೆಳಕಿನ ವೇಗ ಎಷ್ಟು?', options_en: ['3,000 km/s', '30,000 km/s', '300,000 km/s', '3,000,000 km/s'], options_kn: ['3,000 km/s', '30,000 km/s', '300,000 km/s', '3,000,000 km/s'], correctAnswer: 2 },
  { question_en: 'What is the hardest natural substance?', question_kn: 'ಅತ್ಯಂತ ಕಠಿಣವಾದ ನೈಸರ್ಗಿಕ ವಸ್ತು ಯಾವುದು?', options_en: ['Gold', 'Iron', 'Diamond', 'Quartz'], options_kn: ['ಚಿನ್ನ', 'ಕಬ್ಬಿಣ', 'ವಜ್ರ', 'ಸ್ಫಟಿಕ ಶಿಲೆ'], correctAnswer: 2 },
  { question_en: 'By what process do plants make food?', question_kn: 'ಸಸ್ಯಗಳು ಯಾವ ಪ್ರಕ್ರಿಯೆಯಿಂದ ಆಹಾರವನ್ನು ತಯಾರಿಸುತ್ತವೆ?', options_en: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], options_kn: ['ಉಸಿರಾಟ', 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ', 'ಜೀರ್ಣಕ್ರಿಯೆ', 'ಹುದುಗುವಿಕೆ'], correctAnswer: 1 },
  { question_en: 'What is the unit of electrical current?', question_kn: 'ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಘಟಕ ಯಾವುದು?', options_en: ['Volt', 'Ohm', 'Watt', 'Ampere'], options_kn: ['ವೋಲ್ಟ್', 'ಓಮ್', 'ವಾಟ್', 'ಆಂಪಿಯರ್'], correctAnswer: 3 },
  { question_en: 'How many bones are in the adult human body?', question_kn: 'ವಯಸ್ಕರ ದೇಹದಲ್ಲಿ ಎಷ್ಟು ಮೂಳೆಗಳಿವೆ?', options_en: ['200', '206', '212', '220'], options_kn: ['200', '206', '212', '220'], correctAnswer: 1 },
  { question_en: 'Which planet is known for its rings?', question_kn: 'ಯಾವ ಗ್ರಹವು ತನ್ನ ಉಂಗುರಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ?', options_en: ['Mars', 'Jupiter', 'Saturn', 'Venus'], options_kn: ['ಮಂಗಳ', 'ಗುರು', 'ಶನಿ', 'ಶುಕ್ರ'], correctAnswer: 2 },
  { question_en: 'What gas do humans breathe out?', question_kn: 'ಮನುಷ್ಯರು ಯಾವ ಅನಿಲವನ್ನು ಉಸಿರಾಡುತ್ತಾರೆ (ಹೊರಹಾಕುತ್ತಾರೆ)?', options_en: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'], options_kn: ['ಆಮ್ಲಜನಕ', 'ಸಾರಜನಕ', 'ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್', 'ಹೀಲಿಯಂ'], correctAnswer: 2 },
  { question_en: 'What is the chemical symbol for Iron?', question_kn: 'ಕಬ್ಬಿಣದ ರಾಸಾಯನಿಕ ಸಂಕೇತವೇನು?', options_en: ['Ir', 'Fe', 'In', 'I'], options_kn: ['Ir', 'Fe', 'In', 'I'], correctAnswer: 1 },
  { question_en: 'Which organ pumps blood?', question_kn: 'ಯಾವ ಅಂಗ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ?', options_en: ['Brain', 'Lungs', 'Heart', 'Kidney'], options_kn: ['ಮೆದುಳು', 'ಶ್ವಾಸಕೋಶ', 'ಹೃದಯ', 'ಮೂತ್ರಪಿಂಡ'], correctAnswer: 2 },
  { question_en: 'What is the hardest part of the human body?', question_kn: 'ಮಾನವ ದೇಹದ ಅತ್ಯಂತ ಕಠಿಣ ಭಾಗ ಯಾವುದು?', options_en: ['Bone', 'Tooth enamel', 'Skull', 'Nails'], options_kn: ['ಮೂಳೆ', 'ಹಲ್ಲಿನ ದಂತಕವಚ', 'ತಲೆಬುರುಡೆ', 'ಉಗುರುಗಳು'], correctAnswer: 1 },
  { question_en: 'What energy comes from the sun?', question_kn: 'ಸೂರ್ಯನಿಂದ ಯಾವ ಶಕ್ತಿ ಬರುತ್ತದೆ?', options_en: ['Thermal', 'Solar', 'Wind', 'Geothermal'], options_kn: ['ಉಷ್ಣ', 'ಸೌರ', 'ಗಾಳಿ', 'ಭೂಶಾಖದ'], correctAnswer: 1 },
  { question_en: 'What is H2O more commonly known as?', question_kn: 'H2O ಅನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಏನೆಂದು ಕರೆಯಲಾಗುತ್ತದೆ?', options_en: ['Salt', 'Air', 'Water', 'Ice'], options_kn: ['ಉಪ್ಪು', 'ಗಾಳಿ', 'ನೀರು', 'ಮಂಜುಗಡ್ಡೆ'], correctAnswer: 2 },
  { question_en: 'What force pulls objects to the ground?', question_kn: 'ಯಾವ ಶಕ್ತಿಯು ವಸ್ತುಗಳನ್ನು ನೆಲಕ್ಕೆ ಎಳೆಯುತ್ತದೆ?', options_en: ['Magnetism', 'Gravity', 'Friction', 'Tension'], options_kn: ['ಕಾಂತೀಯತೆ', 'ಗುರುತ್ವಾಕರ್ಷಣೆ', 'ಘರ್ಷಣೆ', 'ಒತ್ತಡ'], correctAnswer: 1 },
  { question_en: 'What are the three states of matter?', question_kn: 'ದ್ರವ್ಯದ ಮೂರು ಸ್ಥಿತಿಗಳು ಯಾವುವು?', options_en: ['Solid, Liquid, Gas', 'Ice, Water, Steam', 'Earth, Wind, Fire', 'Proton, Neutron, Electron'], options_kn: ['ಘನ, ದ್ರವ, ಅನಿಲ', 'ಮಂಜುಗಡ್ಡೆ, ನೀರು, ಉಗಿ', 'ಭೂಮಿ, ಗಾಳಿ, ಬೆಂಕಿ', 'ಪ್ರೋಟಾನ್, ನ್ಯೂಟ್ರಾನ್, ಎಲೆಕ್ಟ್ರಾನ್'], correctAnswer: 0 },
  { question_en: 'What is the closest star to Earth?', question_kn: 'ಭೂಮಿಗೆ ಹತ್ತಿರವಿರುವ ನಕ್ಷತ್ರ ಯಾವುದು?', options_en: ['Sirius', 'Proxima Centauri', 'The Sun', 'Alpha Centauri'], options_kn: ['ಸಿರಿಯಸ್', 'ಪ್ರಾಕ್ಸಿಮಾ ಸೆಂಟಾರಿ', 'ಸೂರ್ಯ', 'ಆಲ್ಫಾ ಸೆಂಟಾರಿ'], correctAnswer: 2 },
  { question_en: 'What part of the plant conducts photosynthesis?', question_kn: 'ಸಸ್ಯದ ಯಾವ ಭಾಗವು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ನಡೆಸುತ್ತದೆ?', options_en: ['Roots', 'Stem', 'Leaves', 'Flowers'], options_kn: ['ಬೇರುಗಳು', 'ಕಾಂಡ', 'ಎಲೆಗಳು', 'ಹೂವುಗಳು'], correctAnswer: 2 },
  { question_en: 'What type of animal is a frog?', question_kn: 'ಕಪ್ಪೆ ಯಾವ ರೀತಿಯ ಪ್ರಾಣಿ?', options_en: ['Reptile', 'Amphibian', 'Mammal', 'Fish'], options_kn: ['ಸರೀಸೃಪ', 'ಉಭಯಚರ', 'ಸಸ್ತನಿ', 'ಮೀನು'], correctAnswer: 1 },
  { question_en: 'What is the center of an atom called?', question_kn: 'ಪರಮಾಣುವಿನ ಕೇಂದ್ರವನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?', options_en: ['Electron', 'Proton', 'Nucleus', 'Shell'], options_kn: ['ಎಲೆಕ್ಟ್ರಾನ್', 'ಪ್ರೋಟಾನ್', 'ನ್ಯೂಕ್ಲಿಯಸ್', 'ಶೆಲ್'], correctAnswer: 2 },
  { question_en: 'How many planets are in the solar system?', question_kn: 'ಸೌರವ್ಯೂಹದಲ್ಲಿ ಎಷ್ಟು ಗ್ರಹಗಳಿವೆ?', options_en: ['7', '8', '9', '10'], options_kn: ['7', '8', '9', '10'], correctAnswer: 1 },
  { question_en: 'What is the freezing point of water in Celsius?', question_kn: 'ಸೆಲ್ಸಿಯಸ್‌ನಲ್ಲಿ ನೀರಿನ ಘನೀಕರಿಸುವ ಬಿಂದು ಎಷ್ಟು?', options_en: ['0', '32', '100', '-273'], options_kn: ['0', '32', '100', '-273'], correctAnswer: 0 }
];

export const MOCK_DIGITAL_QUESTIONS = [
  { question_en: 'Who is known as the father of computers?', question_kn: 'ಕಂಪ್ಯೂಟರ್‌ನ ಪಿತಾಮಹ ಯಾರು?', options_en: ['Alan Turing', 'Charles Babbage', 'Bill Gates', 'Steve Jobs'], options_kn: ['ಅಲನ್ ಟ್ಯೂರಿಂಗ್', 'ಚಾರ್ಲ್ಸ್ ಬ್ಯಾಬೇಜ್', 'ಬಿಲ್ ಗೇಟ್ಸ್', 'ಸ್ಟೀವ್ ಜಾಬ್ಸ್'], correctAnswer: 1 },
  { question_en: 'What does CPU stand for?', question_kn: 'CPU ಎಂದರೆ ಏನು?', options_en: ['Central Process Unit', 'Computer Personal Unit', 'Central Processing Unit', 'Central Processor Unit'], options_kn: ['ಸೆಂಟ್ರಲ್ ಪ್ರೊಸೆಸ್ ಯುನಿಟ್', 'ಕಂಪ್ಯೂಟರ್ ಪರ್ಸನಲ್ ಯುನಿಟ್', 'ಸೆಂಟ್ರಲ್ ಪ್ರೊಸೆಸಿಂಗ್ ಯುನಿಟ್', 'ಸೆಂಟ್ರಲ್ ಪ್ರೊಸೆಸರ್ ಯುನಿಟ್'], correctAnswer: 2 },
  { question_en: 'What language is used for styling web pages?', question_kn: 'ವೆಬ್ ಪುಟಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲು ಯಾವ ಭಾಷೆಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ?', options_en: ['HTML', 'Python', 'CSS', 'Java'], options_kn: ['HTML', 'Python', 'CSS', 'Java'], correctAnswer: 2 },
  { question_en: 'What does HTML stand for?', question_kn: 'HTML ಎಂದರೆ ಏನು?', options_en: ['HyperText Markup Language', 'HyperText Machine Language', 'HyperTech Markup Language', 'None'], options_kn: ['HyperText Markup Language', 'HyperText Machine Language', 'HyperTech Markup Language', 'ಯಾವುದೂ ಅಲ್ಲ'], correctAnswer: 0 },
  { question_en: 'What is considered the brain of the computer?', question_kn: 'ಕಂಪ್ಯೂಟರ್‌ನ ಮೆದುಳು ಎಂದು ಯಾವುದನ್ನು ಪರಿಗಣಿಸಲಾಗಿದೆ?', options_en: ['Monitor', 'Keyboard', 'CPU', 'Mouse'], options_kn: ['ಮಾನಿಟರ್', 'ಕೀಬೋರ್ಡ್', 'CPU', 'ಮೌಸ್'], correctAnswer: 2 },
  { question_en: 'What does RAM stand for?', question_kn: 'RAM ಎಂದರೆ ಏನು?', options_en: ['Read Access Memory', 'Random Access Memory', 'Run Access Memory', 'Routine Access Memory'], options_kn: ['Read Access Memory', 'Random Access Memory', 'Run Access Memory', 'Routine Access Memory'], correctAnswer: 1 },
  { question_en: 'What is the keyboard shortcut for Copy?', question_kn: 'ನಕಲಿಸಲು ಕೀಬೋರ್ಡ್ ಶಾರ್ಟ್‌ಕಟ್ ಯಾವುದು?', options_en: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'], options_kn: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'], correctAnswer: 1 },
  { question_en: 'What is the keyboard shortcut for Paste?', question_kn: 'ಅಂಟಿಸಲು ಕೀಬೋರ್ಡ್ ಶಾರ್ಟ್‌ಕಟ್ ಯಾವುದು?', options_en: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'], options_kn: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'], correctAnswer: 2 },
  { question_en: 'Which of the following is an Operating System?', question_kn: 'ಇವುಗಳಲ್ಲಿ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ ಯಾವುದು?', options_en: ['Microsoft Word', 'Windows', 'Google Chrome', 'Python'], options_kn: ['Microsoft Word', 'Windows', 'Google Chrome', 'Python'], correctAnswer: 1 },
  { question_en: 'Which language is primarily used for web interactivity?', question_kn: 'ವೆಬ್ ಇಂಟರ್ಯಾಕ್ಟಿವಿಟಿಗಾಗಿ ಪ್ರಾಥಮಿಕವಾಗಿ ಯಾವ ಭಾಷೆಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ?', options_en: ['CSS', 'HTML', 'JavaScript', 'SQL'], options_kn: ['CSS', 'HTML', 'JavaScript', 'SQL'], correctAnswer: 2 },
  { question_en: 'What does WWW stand for?', question_kn: 'WWW ಎಂದರೆ ಏನು?', options_en: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'], options_kn: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'], correctAnswer: 0 },
  { question_en: '1 Byte is equal to how many bits?', question_kn: '1 ಬೈಟ್ ಎಷ್ಟು ಬಿಟ್‌ಗಳಿಗೆ ಸಮನಾಗಿರುತ್ತದೆ?', options_en: ['4', '8', '16', '32'], options_kn: ['4', '8', '16', '32'], correctAnswer: 1 },
  { question_en: 'Which of the following is an output device?', question_kn: 'ಇವುಗಳಲ್ಲಿ ಔಟ್‌ಪುಟ್ ಸಾಧನ ಯಾವುದು?', options_en: ['Keyboard', 'Mouse', 'Monitor', 'Microphone'], options_kn: ['ಕೀಬೋರ್ಡ್', 'ಮೌಸ್', 'ಮಾನಿಟರ್', 'ಮೈಕ್ರೊಫೋನ್'], correctAnswer: 2 },
  { question_en: 'What does IP stand for?', question_kn: 'IP ಎಂದರೆ ಏನು?', options_en: ['Internal Protocol', 'Internet Protocol', 'Intranet Protocol', 'Interactive Protocol'], options_kn: ['Internal Protocol', 'Internet Protocol', 'Intranet Protocol', 'Interactive Protocol'], correctAnswer: 1 },
  { question_en: 'What is the keyboard shortcut to Undo an action?', question_kn: 'ಕ್ರಿಯೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲು ಕೀಬೋರ್ಡ್ ಶಾರ್ಟ್‌ಕಟ್ ಯಾವುದು?', options_en: ['Ctrl + C', 'Ctrl + X', 'Ctrl + Z', 'Ctrl + Y'], options_kn: ['Ctrl + C', 'Ctrl + X', 'Ctrl + Z', 'Ctrl + Y'], correctAnswer: 2 },
  { question_en: 'What does USB stand for?', question_kn: 'USB ಎಂದರೆ ಏನು?', options_en: ['Universal Serial Bus', 'Unified System Bus', 'Universal System Block', 'United Serial Bus'], options_kn: ['Universal Serial Bus', 'Unified System Bus', 'Universal System Block', 'United Serial Bus'], correctAnswer: 0 },
  { question_en: 'Which is a popular search engine?', question_kn: 'ಜನಪ್ರಿಯ ಸರ್ಚ್ ಎಂಜಿನ್ ಯಾವುದು?', options_en: ['Windows', 'Google', 'Photoshop', 'Intel'], options_kn: ['Windows', 'Google', 'Photoshop', 'Intel'], correctAnswer: 1 },
  { question_en: 'What is the shortcut to save a document?', question_kn: 'ಡಾಕ್ಯುಮೆಂಟ್ ಅನ್ನು ಉಳಿಸಲು ಶಾರ್ಟ್‌ಕಟ್ ಯಾವುದು?', options_en: ['Ctrl + S', 'Ctrl + P', 'Ctrl + V', 'Ctrl + O'], options_kn: ['Ctrl + S', 'Ctrl + P', 'Ctrl + V', 'Ctrl + O'], correctAnswer: 0 },
  { question_en: 'What does Wi-Fi stand for?', question_kn: 'ವೈ-ಫೈ (Wi-Fi) ಎಂದರೆ ಏನು?', options_en: ['Wireless Finder', 'Wireless Fidelity', 'Wired Fiber', 'Wireless Field'], options_kn: ['Wireless Finder', 'Wireless Fidelity', 'Wired Fiber', 'Wireless Field'], correctAnswer: 1 },
  { question_en: 'Which software is used to browse the internet?', question_kn: 'ಇಂಟರ್ನೆಟ್ ಬ್ರೌಸ್ ಮಾಡಲು ಯಾವ ಸಾಫ್ಟ್‌ವೇರ್ ಬಳಸಲಾಗುತ್ತದೆ?', options_en: ['Word Processor', 'Media Player', 'Web Browser', 'Spreadsheet'], options_kn: ['ವರ್ಡ್ ಪ್ರೊಸೆಸರ್', 'ಮೀಡಿಯಾ ಪ್ಲೇಯರ್', 'ವೆಬ್ ಬ್ರೌಸರ್', 'ಸ್ಪ್ರೆಡ್‌ಶೀಟ್'], correctAnswer: 2 },
  { question_en: 'What is unsolicited junk email called?', question_kn: 'ಅನಗತ್ಯ ಜಂಕ್ ಇಮೇಲ್ ಅನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?', options_en: ['Spam', 'Virus', 'Malware', 'Phishing'], options_kn: ['ಸ್ಪ್ಯಾಮ್ (Spam)', 'ವೈರಸ್', 'ಮಾಲ್ವೇರ್', 'ಫಿಶಿಂಗ್'], correctAnswer: 0 },
  { question_en: 'What does OS stand for?', question_kn: 'OS ಎಂದರೆ ಏನು?', options_en: ['Open Source', 'Operating System', 'Optical System', 'Output Source'], options_kn: ['Open Source', 'Operating System', 'Optical System', 'Output Source'], correctAnswer: 1 },
  { question_en: 'What company created Windows?', question_kn: 'ವಿಂಡೋಸ್ (Windows) ಅನ್ನು ಯಾವ ಕಂಪನಿ ರಚಿಸಿದೆ?', options_en: ['Apple', 'IBM', 'Microsoft', 'Google'], options_kn: ['Apple', 'IBM', 'Microsoft', 'Google'], correctAnswer: 2 },
  { question_en: 'Which symbol is used in email addresses?', question_kn: 'ಇಮೇಲ್ ವಿಳಾಸಗಳಲ್ಲಿ ಯಾವ ಚಿಹ್ನೆಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ?', options_en: ['#', '&', '@', '$'], options_kn: ['#', '&', '@', '$'], correctAnswer: 2 },
  { question_en: 'What is a malicious software called?', question_kn: 'ದುರುದ್ದೇಶಪೂರಿತ ಸಾಫ್ಟ್‌ವೇರ್ ಅನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?', options_en: ['Freeware', 'Malware', 'Firmware', 'Hardware'], options_kn: ['ಫ್ರೀವೇರ್', 'ಮಾಲ್ವೇರ್ (Malware)', 'ಫರ್ಮ್‌ವೇರ್', 'ಹಾರ್ಡ್‌ವೇರ್'], correctAnswer: 1 },
  { question_en: 'What does PDF stand for?', question_kn: 'PDF ಎಂದರೆ ಏನು?', options_en: ['Portable Document Format', 'Print Document File', 'Public Domain Format', 'Personal Data File'], options_kn: ['Portable Document Format', 'Print Document File', 'Public Domain Format', 'Personal Data File'], correctAnswer: 0 },
  { question_en: 'Which device is used for printing?', question_kn: 'ಮುದ್ರಣಕ್ಕಾಗಿ ಯಾವ ಸಾಧನವನ್ನು ಬಳಸಲಾಗುತ್ತದೆ?', options_en: ['Scanner', 'Printer', 'Monitor', 'Projector'], options_kn: ['ಸ್ಕ್ಯಾನರ್', 'ಪ್ರಿಂಟರ್', 'ಮಾನಿಟರ್', 'ಪ್ರೊಜೆಕ್ಟರ್'], correctAnswer: 1 },
  { question_en: 'What is the keyboard shortcut for Select All?', question_kn: 'ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆ ಮಾಡಲು (Select All) ಕೀಬೋರ್ಡ್ ಶಾರ್ಟ್‌ಕಟ್ ಯಾವುದು?', options_en: ['Ctrl + C', 'Ctrl + S', 'Ctrl + A', 'Ctrl + V'], options_kn: ['Ctrl + C', 'Ctrl + S', 'Ctrl + A', 'Ctrl + V'], correctAnswer: 2 },
  { question_en: 'What does IT stand for?', question_kn: 'IT ಎಂದರೆ ಏನು?', options_en: ['Internet Technology', 'Information Technology', 'Internal Tool', 'Interactive Tech'], options_kn: ['Internet Technology', 'Information Technology', 'Internal Tool', 'Interactive Tech'], correctAnswer: 1 },
  { question_en: 'What is the main circuit board called?', question_kn: 'ಮುಖ್ಯ ಸರ್ಕ್ಯೂಟ್ ಬೋರ್ಡ್ ಅನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?', options_en: ['CPU', 'Motherboard', 'Hard Drive', 'Power Supply'], options_kn: ['CPU', 'ಮದರ್‌ಬೋರ್ಡ್', 'ಹಾರ್ಡ್ ಡ್ರೈವ್', 'ವಿದ್ಯುತ್ ಸರಬರಾಜು'], correctAnswer: 1 }
];

export const LEARN_MATH_QUESTIONS = [
  { question_en: 'What is 5 + 5?', question_kn: '5 + 5 ಎಷ್ಟು?', options_en: ['5', '10', '15', '20'], options_kn: ['5', '10', '15', '20'], correctAnswer: 1 },
  { question_en: 'What is 10 - 3?', question_kn: '10 - 3 ಎಷ್ಟು?', options_en: ['5', '6', '7', '8'], options_kn: ['5', '6', '7', '8'], correctAnswer: 2 },
  { question_en: 'What is 4 times 4?', question_kn: '4 ನ್ನು 4 ರಿಂದ ಗುಣಿಸಿದರೆ ಎಷ್ಟು?', options_en: ['8', '12', '16', '20'], options_kn: ['8', '12', '16', '20'], correctAnswer: 2 },
  { question_en: 'What is 20 divided by 5?', question_kn: '20 ನ್ನು 5 ರಿಂದ ಭಾಗಿಸಿದರೆ ಎಷ್ಟು?', options_en: ['2', '4', '5', '10'], options_kn: ['2', '4', '5', '10'], correctAnswer: 1 },
  { question_en: 'Is 15 an even or odd number?', question_kn: '15 ಸಮ ಸಂಖ್ಯೆಯೋ ಅಥವಾ ಬೆಸ ಸಂಖ್ಯೆಯೋ?', options_en: ['Even', 'Odd', 'Prime', 'None'], options_kn: ['ಸಮ', 'ಬೆಸ', 'ಅವಿಭಾಜ್ಯ', 'ಯಾವುದೂ ಅಲ್ಲ'], correctAnswer: 1 }
];

export const LEARN_SCIENCE_QUESTIONS = [
  { question_en: 'What do bees collect from flowers?', question_kn: 'ಜೇನುನೊಣಗಳು ಹೂವುಗಳಿಂದ ಏನನ್ನು ಸಂಗ್ರಹಿಸುತ್ತವೆ?', options_en: ['Leaves', 'Nectar', 'Roots', 'Bark'], options_kn: ['ಎಲೆಗಳು', 'ಮಕರಂದ', 'ಬೇರುಗಳು', 'ತೊಗಟೆ'], correctAnswer: 1 },
  { question_en: 'Which part of the plant grows underground?', question_kn: 'ಸಸ್ಯದ ಯಾವ ಭಾಗವು ನೆಲದಡಿಯಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ?', options_en: ['Stem', 'Leaf', 'Root', 'Flower'], options_kn: ['ಕಾಂಡ', 'ಎಲೆ', 'ಬೇರು', 'ಹೂವು'], correctAnswer: 2 },
  { question_en: 'What is the main source of light during the day?', question_kn: 'ಹಗಲಿನಲ್ಲಿ ಬೆಳಕಿನ ಮುಖ್ಯ ಮೂಲ ಯಾವುದು?', options_en: ['Moon', 'Stars', 'Sun', 'Fire'], options_kn: ['ಚಂದ್ರ', 'ನಕ್ಷತ್ರಗಳು', 'ಸೂರ್ಯ', 'ಬೆಂಕಿ'], correctAnswer: 2 },
  { question_en: 'What do we breathe in to survive?', question_kn: 'ಬದುಕುಳಿಯಲು ನಾವು ಏನನ್ನು ಉಸಿರಾಡುತ್ತೇವೆ?', options_en: ['Carbon', 'Oxygen', 'Helium', 'Nitrogen'], options_kn: ['ಇಂಗಾಲ', 'ಆಮ್ಲಜನಕ', 'ಹೀಲಿಯಂ', 'ಸಾರಜನಕ'], correctAnswer: 1 },
  { question_en: 'Water turns into what when frozen?', question_kn: 'ನೀರು ಹೆಪ್ಪುಗಟ್ಟಿದಾಗ ಏನಾಗುತ್ತದೆ?', options_en: ['Steam', 'Cloud', 'Ice', 'Rain'], options_kn: ['ಉಗಿ', 'ಮೋಡ', 'ಮಂಜುಗಡ್ಡೆ', 'ಮಳೆ'], correctAnswer: 2 }
];

export const LEARN_DIGITAL_QUESTIONS = [
  { question_en: 'What device do we use to click on a screen?', question_kn: 'ಪರದೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಲು ನಾವು ಯಾವ ಸಾಧನವನ್ನು ಬಳಸುತ್ತೇವೆ?', options_en: ['Keyboard', 'Mouse', 'Monitor', 'Printer'], options_kn: ['ಕೀಬೋರ್ಡ್', 'ಮೌಸ್', 'ಮಾನಿಟರ್', 'ಪ್ರಿಂಟರ್'], correctAnswer: 1 },
  { question_en: 'What does a keyboard do?', question_kn: 'ಕೀಬೋರ್ಡ್ ಏನು ಮಾಡುತ್ತದೆ?', options_en: ['Types text', 'Plays music', 'Prints pages', 'Displays images'], options_kn: ['ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡುತ್ತದೆ', 'ಸಂಗೀತವನ್ನು ನುಡಿಸುತ್ತದೆ', 'ಪುಟಗಳನ್ನು ಮುದ್ರಿಸುತ್ತದೆ', 'ಚಿತ್ರಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ'], correctAnswer: 0 },
  { question_en: 'Which is a common video call app?', question_kn: 'ಸಾಮಾನ್ಯ ವೀಡಿಯೊ ಕರೆ ಅಪ್ಲಿಕೇಶನ್ ಯಾವುದು?', options_en: ['Zoom', 'Excel', 'Word', 'Notepad'], options_kn: ['ಝೂಮ್ (Zoom)', 'ಎಕ್ಸೆಲ್', 'ವರ್ಡ್', 'ನೋಟ್‌ಪ್ಯಾಡ್'], correctAnswer: 0 },
  { question_en: 'What does a printer do?', question_kn: 'ಪ್ರಿಂಟರ್ ಏನು ಮಾಡುತ್ತದೆ?', options_en: ['Scans photos', 'Plays games', 'Prints documents', 'Sends emails'], options_kn: ['ಫೋಟೋಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುತ್ತದೆ', 'ಆಟಗಳನ್ನು ಆಡುತ್ತದೆ', 'ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಮುದ್ರಿಸುತ್ತದೆ', 'ಇಮೇಲ್‌ಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ'], correctAnswer: 2 },
  { question_en: 'What is a smartphone?', question_kn: 'ಸ್ಮಾರ್ಟ್ಫೋನ್ ಎಂದರೆ ಏನು?', options_en: ['A smart TV', 'A mobile computer', 'A digital watch', 'A camera'], options_kn: ['ಸ್ಮಾರ್ಟ್ ಟಿವಿ', 'ಮೊಬೈಲ್ ಕಂಪ್ಯೂಟರ್', 'ಡಿಜಿಟಲ್ ವಾಚ್', 'ಕ್ಯಾಮೆರಾ'], correctAnswer: 1 }
];

export const mockQuizzes = [
  // Class 8
  { id: 'c8-m-1', class: 8, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Rational Numbers Mastery', title_kn: 'ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳ ಪಾಂಡಿತ್ಯ', questions: 15, xp: 250 },
  { id: 'c8-m-2', class: 8, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Linear Equations Challenge', title_kn: 'ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳ ಸವಾಲು', questions: 15, xp: 250 },
  { id: 'c8-s-1', class: 8, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Microorganisms Basics', title_kn: 'ಸೂಕ್ಷ್ಮಜೀವಿಗಳ ಮೂಲಗಳು', questions: 15, xp: 250 },
  { id: 'c8-s-2', class: 8, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Crop Production & Management', title_kn: 'ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ', questions: 15, xp: 250 },
  { id: 'c8-d-1', class: 8, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'Intro to Computers', title_kn: 'ಕಂಪ್ಯೂಟರ್ ಪರಿಚಯ', questions: 15, xp: 250 },
  { id: 'c8-d-2', class: 8, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'Internet Safety Basics', title_kn: 'ಇಂಟರ್ನೆಟ್ ಸುರಕ್ಷತೆ ಮೂಲಗಳು', questions: 15, xp: 250 },
  
  // Class 9
  { id: 'c9-m-1', class: 9, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Number Systems Quiz', title_kn: 'ಸಂಖ್ಯಾ ವ್ಯವಸ್ಥೆ ರಸಪ್ರಶ್ನೆ', questions: 15, xp: 250 },
  { id: 'c9-m-2', class: 9, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Polynomials (Level 1)', title_kn: 'ಬಹುಪದೋಕ್ತಿಗಳು (ಹಂತ 1)', questions: 15, xp: 250 },
  { id: 'c9-s-1', class: 9, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Matter in Our Surroundings', title_kn: 'ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯ', questions: 15, xp: 250 },
  { id: 'c9-s-2', class: 9, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Atoms and Molecules', title_kn: 'ಪರಮಾಣುಗಳು ಮತ್ತು ಅಣುಗಳು', questions: 15, xp: 250 },
  { id: 'c9-d-1', class: 9, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'HTML Tags & Attributes', title_kn: 'HTML ಟ್ಯಾಗ್‌ಗಳು', questions: 15, xp: 250 },
  { id: 'c9-d-2', class: 9, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'CSS Styling Foundations', title_kn: 'CSS ಸ್ಟೈಲಿಂಗ್ ಮೂಲಗಳು', questions: 15, xp: 250 },
  
  // Class 10
  { id: 'c10-m-1', class: 10, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Real Numbers Prep', title_kn: 'ವಾಸ್ತವ ಸಂಖ್ಯೆಗಳ ತಯಾರಿ', questions: 15, xp: 250 },
  { id: 'c10-m-2', class: 10, subject: 'Mathematics', subject_kn: 'ಗಣಿತ', title: 'Quadratic Equations', title_kn: 'ವರ್ಗ ಸಮೀಕರಣಗಳು', questions: 15, xp: 250 },
  { id: 'c10-s-1', class: 10, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Chemical Reactions', title_kn: 'ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು', questions: 15, xp: 250 },
  { id: 'c10-s-2', class: 10, subject: 'Science', subject_kn: 'ವಿಜ್ಞಾನ', title: 'Life Processes', title_kn: 'ಜೀವ ಕ್ರಿಯೆಗಳು', questions: 15, xp: 250 },
  { id: 'c10-d-1', class: 10, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'JavaScript Logic', title_kn: 'ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ತರ್ಕ', questions: 15, xp: 250 },
  { id: 'c10-d-2', class: 10, subject: 'Digital Skills', subject_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', title: 'Python Basics', title_kn: 'ಪೈಥಾನ್ ಮೂಲಗಳು', questions: 15, xp: 250 },
];

export const syllabusData = [
  {
    classLevel: 8,
    subjects: [
      { name: 'Mathematics', name_kn: 'ಗಣಿತ', chapters: ['Rational Numbers', 'Linear Equations in One Variable'], chapters_kn: ['ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು', 'ಒಂದು ಚರಾಕ್ಷರವಿರುವ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳು'] },
      { name: 'Science', name_kn: 'ವಿಜ್ಞಾನ', chapters: ['Crop Production and Management', 'Microorganisms'], chapters_kn: ['ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ', 'ಸೂಕ್ಷ್ಮಜೀವಿಗಳು'] },
      { name: 'Digital Skills', name_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', chapters: ['Introduction to Computers', 'Basic Coding with Scratch'], chapters_kn: ['ಕಂಪ್ಯೂಟರ್ ಪರಿಚಯ', 'ಸ್ಕ್ರ್ಯಾಚ್‌ನೊಂದಿಗೆ ಬೇಸಿಕ್ ಕೋಡಿಂಗ್'] }
    ]
  },
  {
    classLevel: 9,
    subjects: [
      { name: 'Mathematics', name_kn: 'ಗಣಿತ', chapters: ['Number Systems', 'Polynomials', 'Coordinate Geometry'], chapters_kn: ['ಸಂಖ್ಯಾ ವ್ಯವಸ್ಥೆಗಳು', 'ಬಹುಪದೋಕ್ತಿಗಳು', 'ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ'] },
      { name: 'Science', name_kn: 'ವಿಜ್ಞಾನ', chapters: ['Matter in Our Surroundings', 'Is Matter Around Us Pure'], chapters_kn: ['ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯ', 'ನಮ್ಮ ಸುತ್ತಲಿನ ದ್ರವ್ಯ ಶುದ್ಧವೇ'] },
      { name: 'Digital Skills', name_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', chapters: ['HTML Basics', 'CSS Basics', 'Logic and Flowcharts'], chapters_kn: ['HTML ಮೂಲಗಳು', 'CSS ಮೂಲಗಳು', 'ತರ್ಕ ಮತ್ತು ಫ್ಲೋಚಾರ್ಟ್‌ಗಳು'] }
    ]
  },
  {
    classLevel: 10,
    subjects: [
      { name: 'Mathematics', name_kn: 'ಗಣಿತ', chapters: ['Real Numbers', 'Polynomials', 'Quadratic Equations'], chapters_kn: ['ವಾಸ್ತವ ಸಂಖ್ಯೆಗಳು', 'ಬಹುಪದೋಕ್ತಿಗಳು', 'ವರ್ಗ ಸಮೀಕರಣಗಳು'] },
      { name: 'Science', name_kn: 'ವಿಜ್ಞಾನ', chapters: ['Chemical Reactions and Equations', 'Acids, Bases and Salts'], chapters_kn: ['ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು', 'ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು'] },
      { name: 'Digital Skills', name_kn: 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು', chapters: ['JavaScript Basics', 'Introduction to Python'], chapters_kn: ['ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಮೂಲಗಳು', 'ಪೈಥಾನ್ ಪರಿಚಯ'] }
    ]
  }
];

export const textbookContent: Record<string, { en: string, kn: string }> = {
  'Mathematics': {
    en: `1. Introduction
Mathematics is the science that deals with the logic of shape, quantity and arrangement. In this chapter, we will explore fundamental concepts that build the foundation of algebra and geometry. You will learn how to identify patterns, solve equations, and apply mathematical reasoning to real-world problems. Let's begin by understanding the basic rules of operations and how they apply to different types of numbers.

2. The Number System
The number system is the mathematical way of representing numbers.
• Natural Numbers: Counting numbers starting from 1 (1, 2, 3...)
• Whole Numbers: Natural numbers including zero (0, 1, 2, 3...)
• Integers: All whole numbers and their negative counterparts (-2, -1, 0, 1, 2...)
• Rational Numbers: Numbers that can be expressed as a fraction p/q where q is not zero.
• Irrational Numbers: Numbers that cannot be expressed as a simple fraction (e.g., √2, π).

3. Operations on Rational Numbers
When performing operations, always remember the order of operations (PEMDAS/BODMAS):
- Parentheses / Brackets
- Exponents / Orders
- Multiplication & Division (from left to right)
- Addition & Subtraction (from left to right)

Example:
Solve: 4 + 3 × (2 + 1)
Step 1: Parentheses (2 + 1) = 3
Step 2: Multiplication 3 × 3 = 9
Step 3: Addition 4 + 9 = 13

4. Algebraic Expressions
An algebraic expression is formed from variables and constants using different operations.
Terms: The parts of an expression separated by + or - signs.
Coefficients: The numerical factor of a term containing a variable.

5. Linear Equations in One Variable
An equation is a statement that asserts the equality of two expressions.
What you do to one side of an equation, you must do to the other to keep it balanced.
Solve for x: 2x + 5 = 15
2x = 10
x = 5

6. Summary
Practice is the key to mastering mathematical logic. Make sure to solve all the exercise problems at the end of this chapter to solidify your understanding of these core concepts.`,
    kn: `1. ಪರಿಚಯ
ಗಣಿತವು ಆಕಾರ, ಪ್ರಮಾಣ ಮತ್ತು ವ್ಯವಸ್ಥೆಯ ತರ್ಕದೊಂದಿಗೆ ವ್ಯವಹರಿಸುವ ವಿಜ್ಞಾನವಾಗಿದೆ. ಈ ಅಧ್ಯಾಯದಲ್ಲಿ, ಬೀಜಗಣಿತ ಮತ್ತು ರೇಖಾಗಣಿತದ ಅಡಿಪಾಯವನ್ನು ನಿರ್ಮಿಸುವ ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ನಾವು ಅನ್ವೇಷಿಸುತ್ತೇವೆ. ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸುವುದು, ಸಮೀಕರಣಗಳನ್ನು ಬಿಡಿಸುವುದು ಮತ್ತು ನೈಜ-ಪ್ರಪಂಚದ ಸಮಸ್ಯೆಗಳಿಗೆ ಗಣಿತದ ತಾರ್ಕಿಕತೆಯನ್ನು ಹೇಗೆ ಅನ್ವಯಿಸಬೇಕು ಎಂಬುದನ್ನು ನೀವು ಕಲಿಯುವಿರಿ.

2. ಸಂಖ್ಯಾ ವ್ಯವಸ್ಥೆ
ಸಂಖ್ಯಾ ವ್ಯವಸ್ಥೆಯು ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಗಣಿತದ ವಿಧಾನವಾಗಿದೆ.
• ಸ್ವಾಭಾವಿಕ ಸಂಖ್ಯೆಗಳು: 1 ರಿಂದ ಪ್ರಾರಂಭವಾಗುವ ಎಣಿಕೆಯ ಸಂಖ್ಯೆಗಳು (1, 2, 3...)
• ಪೂರ್ಣ ಸಂಖ್ಯೆಗಳು: ಶೂನ್ಯವನ್ನು ಒಳಗೊಂಡಂತೆ ಸ್ವಾಭಾವಿಕ ಸಂಖ್ಯೆಗಳು (0, 1, 2, 3...)
• ಪೂರ್ಣಾಂಕಗಳು: ಎಲ್ಲಾ ಪೂರ್ಣ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಅವುಗಳ ಋಣಾತ್ಮಕ ಪ್ರತಿರೂಪಗಳು (-2, -1, 0, 1, 2...)
• ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು: q ಸೊನ್ನೆಯಾಗಿರದ p/q ಭಿನ್ನರಾಶಿಯಾಗಿ ವ್ಯಕ್ತಪಡಿಸಬಹುದಾದ ಸಂಖ್ಯೆಗಳು.
• ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು: ಸರಳ ಭಿನ್ನರಾಶಿಯಾಗಿ ವ್ಯಕ್ತಪಡಿಸಲಾಗದ ಸಂಖ್ಯೆಗಳು (ಉದಾಹರಣೆಗೆ, √2, π).

3. ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳ ಮೇಲಿನ ಕಾರ್ಯಾಚರಣೆಗಳು
ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ನಿರ್ವಹಿಸುವಾಗ, ಯಾವಾಗಲೂ ಕಾರ್ಯಾಚರಣೆಗಳ ಕ್ರಮವನ್ನು ನೆನಪಿಡಿ (BODMAS):
- ಬ್ರಾಕೆಟ್ಗಳು (Brackets)
- ಆರ್ಡರ್ಸ್ (Orders)
- ಗುಣಾಕಾರ ಮತ್ತು ಭಾಗಾಕಾರ (Multiplication & Division)
- ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ (Addition & Subtraction)

ಉದಾಹರಣೆ: 4 + 3 × (2 + 1) ನ್ನು ಬಿಡಿಸಿ
ಹಂತ 1: ಬ್ರಾಕೆಟ್ಗಳು (2 + 1) = 3
ಹಂತ 2: ಗುಣಾಕಾರ 3 × 3 = 9
ಹಂತ 3: ಸಂಕಲನ 4 + 9 = 13

4. ಬೀಜಗಣಿತದ ಅಭಿವ್ಯಕ್ತಿಗಳು
ಬೀಜಗಣಿತದ ಅಭಿವ್ಯಕ್ತಿಯು ವಿವಿಧ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಅಸ್ಥಿರಗಳು ಮತ್ತು ಸ್ಥಿರಾಂಕಗಳಿಂದ ರೂಪುಗೊಳ್ಳುತ್ತದೆ. 

5. ಸಮೀಕರಣಗಳು
ಸಮೀಕರಣವು ಎರಡು ಅಭಿವ್ಯಕ್ತಿಗಳ ಸಮಾನತೆಯನ್ನು ಪ್ರತಿಪಾದಿಸುವ ಹೇಳಿಕೆಯಾಗಿದೆ. ಸಮೀಕರಣವನ್ನು ಸಮತೋಲನದಲ್ಲಿಡಲು ಒಂದು ಕಡೆ ಮಾಡುವ ಬದಲಾವಣೆಯನ್ನು ಮತ್ತೊಂದು ಕಡೆಗೂ ಮಾಡಬೇಕು.

6. ಸಾರಾಂಶ
ಗಣಿತದ ತರ್ಕವನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳಲು ಅಭ್ಯಾಸವೇ ಪ್ರಮುಖವಾಗಿದೆ. ಈ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಅಧ್ಯಾಯದ ಕೊನೆಯಲ್ಲಿರುವ ಎಲ್ಲಾ ಅಭ್ಯಾಸ ಸಮಸ್ಯೆಗಳನ್ನು ಬಿಡಿಸಿ.`
  },
  'Science': {
    en: `1. Understanding the Natural World
Science is the systematic study of the structure and behavior of the physical and natural world through observation and experiment. In this lesson, we dive into the fundamental laws that govern nature. From the microscopic cells in our bodies to the vast expanse of the universe, understanding these principles helps us make sense of the world around us.

2. Matter in Our Surroundings
Matter is anything that has mass and takes up space. All matter is made up of tiny particles.
States of Matter:
• Solid: Particles are tightly packed, vibrating in fixed positions. Solids have a definite shape and volume.
• Liquid: Particles are close together but can move past one another. Liquids have a definite volume but take the shape of their container.
• Gas: Particles are far apart and move freely. Gases have no definite shape or volume and expand to fill their container.

3. Change of State
Matter can change from one state to another by heating or cooling.
- Melting: Solid to Liquid (e.g., ice turning to water).
- Freezing: Liquid to Solid.
- Evaporation: Liquid to Gas (e.g., boiling water turning to steam).
- Condensation: Gas to Liquid.
- Sublimation: Solid directly to Gas (e.g., dry ice).

4. Atoms and Molecules
An atom is the smallest unit of ordinary matter that forms a chemical element.
A molecule is an electrically neutral group of two or more atoms held together by chemical bonds.
Inside an atom, there is a central nucleus containing protons (positive) and neutrons (neutral), surrounded by a cloud of electrons (negative).

5. Chemical Reactions
A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another.
Reactants -> Products
The Law of Conservation of Mass states that mass in an isolated system is neither created nor destroyed by chemical reactions.

6. Conclusion
The scientific method relies on observation, hypothesis, and experimentation. Always question your surroundings and look for empirical evidence.`,
    kn: `1. ನೈಸರ್ಗಿಕ ಪ್ರಪಂಚವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು
ವಿಜ್ಞಾನವು ವೀಕ್ಷಣೆ ಮತ್ತು ಪ್ರಯೋಗದ ಮೂಲಕ ಭೌತಿಕ ಮತ್ತು ನೈಸರ್ಗಿಕ ಪ್ರಪಂಚದ ರಚನೆ ಮತ್ತು ನಡವಳಿಕೆಯ ವ್ಯವಸ್ಥಿತ ಅಧ್ಯಯನವಾಗಿದೆ. ಈ ಪಾಠದಲ್ಲಿ, ಪ್ರಕೃತಿಯನ್ನು ನಿಯಂತ್ರಿಸುವ ಮೂಲಭೂತ ನಿಯಮಗಳನ್ನು ನಾವು ಕಲಿಯುತ್ತೇವೆ. 

2. ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯ
ದ್ರವ್ಯವು ದ್ರವ್ಯರಾಶಿಯನ್ನು ಹೊಂದಿರುವ ಮತ್ತು ಜಾಗವನ್ನು ಆಕ್ರಮಿಸುವ ಯಾವುದಾದರೂ ಆಗಿದೆ. ಎಲ್ಲಾ ದ್ರವ್ಯಗಳು ಸಣ್ಣ ಕಣಗಳಿಂದ ಮಾಡಲ್ಪಟ್ಟಿವೆ.
ದ್ರವ್ಯದ ಸ್ಥಿತಿಗಳು:
• ಘನ: ಕಣಗಳು ಬಿಗಿಯಾಗಿ ಪ್ಯಾಕ್ ಆಗಿದ್ದು, ಸ್ಥಿರ ಸ್ಥಾನಗಳಲ್ಲಿ ಕಂಪಿಸುತ್ತವೆ. ನಿರ್ದಿಷ್ಟ ಆಕಾರ ಮತ್ತು ಪರಿಮಾಣವನ್ನು ಹೊಂದಿರುತ್ತವೆ.
• ದ್ರವ: ಕಣಗಳು ಒಟ್ಟಿಗೆ ಹತ್ತಿರದಲ್ಲಿವೆ ಆದರೆ ಒಂದಕ್ಕೊಂದು ಚಲಿಸಬಹುದು. ನಿರ್ದಿಷ್ಟ ಪರಿಮಾಣವನ್ನು ಹೊಂದಿವೆ ಆದರೆ ಆಕಾರವನ್ನು ಹೊಂದಿಲ್ಲ.
• ಅನಿಲ: ಕಣಗಳು ದೂರದಲ್ಲಿವೆ ಮತ್ತು ಮುಕ್ತವಾಗಿ ಚಲಿಸುತ್ತವೆ. ನಿರ್ದಿಷ್ಟ ಆಕಾರ ಅಥವಾ ಪರಿಮಾಣವಿಲ್ಲ.

3. ಸ್ಥಿತಿಯ ಬದಲಾವಣೆ
ಬಿಸಿಮಾಡುವ ಅಥವಾ ತಂಪಾಗಿಸುವ ಮೂಲಕ ದ್ರವ್ಯವು ಒಂದು ಸ್ಥಿತಿಯಿಂದ ಇನ್ನೊಂದಕ್ಕೆ ಬದಲಾಗಬಹುದು.
- ಕರಗುವಿಕೆ: ಘನದಿಂದ ದ್ರವಕ್ಕೆ.
- ಘನೀಕರಣ: ದ್ರವದಿಂದ ಘನಕ್ಕೆ.
- ಆವಿಯಾಗುವಿಕೆ: ದ್ರವದಿಂದ ಅನಿಲಕ್ಕೆ.
- ಘನೀಕರಣ (Condensation): ಅನಿಲದಿಂದ ದ್ರವಕ್ಕೆ.

4. ಪರಮಾಣುಗಳು ಮತ್ತು ಅಣುಗಳು
ಪರಮಾಣುವು ರಾಸಾಯನಿಕ ಮೂಲವಸ್ತುವನ್ನು ರೂಪಿಸುವ ಸಾಮಾನ್ಯ ದ್ರವ್ಯದ ಚಿಕ್ಕ ಘಟಕವಾಗಿದೆ.
ಅಣುವು ರಾಸಾಯನಿಕ ಬಂಧಗಳಿಂದ ಒಟ್ಟಿಗೆ ಹಿಡಿದಿರುವ ಎರಡು ಅಥವಾ ಹೆಚ್ಚಿನ ಪರಮಾಣುಗಳ ಗುಂಪಾಗಿದೆ.

5. ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು
ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಯು ರಾಸಾಯನಿಕ ವಸ್ತುಗಳ ಒಂದು ಗುಂಪಿನ ರಾಸಾಯನಿಕ ರೂಪಾಂತರಕ್ಕೆ ಕಾರಣವಾಗುವ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ. ದ್ರವ್ಯರಾಶಿಯ ಸಂರಕ್ಷಣೆಯ ನಿಯಮದಂತೆ ದ್ರವ್ಯರಾಶಿಯನ್ನು ಸೃಷ್ಟಿಸಲು ಅಥವಾ ನಾಶಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.

6. ತೀರ್ಮಾನ
ವೈಜ್ಞಾನಿಕ ವಿಧಾನವು ವೀಕ್ಷಣೆ, ಕಲ್ಪನೆ ಮತ್ತು ಪ್ರಯೋಗವನ್ನು ಅವಲಂಬಿಸಿದೆ. ಯಾವಾಗಲೂ ಪ್ರಾಯೋಗಿಕ ಪುರಾವೆಗಳನ್ನು ಹುಡುಕಿ.`
  },
  'Digital Skills': {
    en: `1. Introduction to Digital Literacy
Digital literacy is essential in today's technology-driven world. This chapter covers the foundational concepts of computing, including hardware, software, and the internet. You will learn how information is processed, stored, and transmitted, as well as the basic building blocks of coding and web development.

2. Hardware vs Software
• Hardware: The physical components of a computer system that you can touch. Examples include the CPU, RAM, Hard Drive, Keyboard, and Monitor.
• Software: The set of instructions, data, or programs used to operate computers and execute specific tasks. Examples include Operating Systems (Windows, macOS) and Applications (Web Browsers, Word Processors).

3. The Internet and World Wide Web
The Internet is a global network of interconnected computers.
The World Wide Web (WWW) is a collection of web pages found on this network of computers. Your web browser uses the Internet to access the Web.
- IP Address: A unique string of numbers separated by periods that identifies each computer using the Internet Protocol.
- URL (Uniform Resource Locator): The address of a given unique resource on the Web.

4. Basics of Coding
Coding is the process of giving instructions to a computer to perform a specific task.
A programming language is a vocabulary and set of grammatical rules for instructing a computer or computing device.
Examples of Programming Languages:
- HTML (HyperText Markup Language): Used to create the structure of web pages.
- CSS (Cascading Style Sheets): Used to style and design web pages.
- JavaScript: Used to make web pages interactive.
- Python: A versatile language used for web development, data analysis, and artificial intelligence.

5. Algorithms and Logic
An algorithm is a step-by-step procedure or formula for solving a problem.
In programming, algorithms are used to define the logic of a program.
Flowcharts are graphical representations of algorithms, using different shapes to denote different types of steps (e.g., rectangles for processes, diamonds for decisions).

6. Cybersecurity Basics
Protecting your digital identity is crucial.
- Always use strong, unique passwords.
- Enable Two-Factor Authentication (2FA) when available.
- Be wary of phishing emails that attempt to steal your personal information.`,
    kn: `1. ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆಯ ಪರಿಚಯ
ಇಂದಿನ ತಂತ್ರಜ್ಞಾನ ಆಧಾರಿತ ಜಗತ್ತಿನಲ್ಲಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಅತ್ಯಗತ್ಯ. ಈ ಅಧ್ಯಾಯವು ಹಾರ್ಡ್‌ವೇರ್, ಸಾಫ್ಟ್‌ವೇರ್ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಸೇರಿದಂತೆ ಕಂಪ್ಯೂಟಿಂಗ್‌ನ ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ಸಂಸ್ಕರಿಸಲಾಗುತ್ತದೆ, ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ರವಾನಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಕಲಿಯುವಿರಿ.

2. ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಸಾಫ್ಟ್‌ವೇರ್
• ಹಾರ್ಡ್‌ವೇರ್: ನೀವು ಸ್ಪರ್ಶಿಸಬಹುದಾದ ಕಂಪ್ಯೂಟರ್ ಸಿಸ್ಟಂನ ಭೌತಿಕ ಘಟಕಗಳು (ಉದಾ: CPU, ಕೀಬೋರ್ಡ್).
• ಸಾಫ್ಟ್‌ವೇರ್: ಕಂಪ್ಯೂಟರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಮತ್ತು ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಬಳಸುವ ಸೂಚನೆಗಳು ಅಥವಾ ಕಾರ್ಯಕ್ರಮಗಳು (ಉದಾ: ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್, ಬ್ರೌಸರ್).

3. ಇಂಟರ್ನೆಟ್
ಇಂಟರ್ನೆಟ್ ಪರಸ್ಪರ ಸಂಪರ್ಕಗೊಂಡಿರುವ ಕಂಪ್ಯೂಟರ್‌ಗಳ ಜಾಗತಿಕ ಜಾಲವಾಗಿದೆ.
ವರ್ಲ್ಡ್ ವೈಡ್ ವೆಬ್ (WWW) ವೆಬ್ ಪುಟಗಳ ಸಂಗ್ರಹವಾಗಿದೆ.
- IP ವಿಳಾಸ: ಇಂಟರ್ನೆಟ್ ಬಳಸುವ ಪ್ರತಿ ಕಂಪ್ಯೂಟರ್ ಅನ್ನು ಗುರುತಿಸುವ ಅನನ್ಯ ಸಂಖ್ಯೆಗಳ ಸ್ಟ್ರಿಂಗ್.
- URL: ವೆಬ್‌ನಲ್ಲಿ ನಿರ್ದಿಷ್ಟ ಸಂಪನ್ಮೂಲದ ವಿಳಾಸ.

4. ಕೋಡಿಂಗ್ ಮೂಲಗಳು
ಕೋಡಿಂಗ್ ಎಂದರೆ ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯವನ್ನು ನಿರ್ವಹಿಸಲು ಕಂಪ್ಯೂಟರ್‌ಗೆ ಸೂಚನೆಗಳನ್ನು ನೀಡುವ ಪ್ರಕ್ರಿಯೆ.
ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳು:
- HTML: ವೆಬ್ ಪುಟಗಳ ರಚನೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲು.
- CSS: ವೆಬ್ ಪುಟಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲು.
- ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್: ವೆಬ್ ಪುಟಗಳನ್ನು ಸಂವಾದಾತ್ಮಕವಾಗಿಸಲು.
- ಪೈಥಾನ್: ವೆಬ್ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಡೇಟಾ ವಿಶ್ಲೇಷಣೆಗೆ ಬಳಸುವ ಬಹುಮುಖ ಭಾಷೆ.

5. ಕ್ರಮಾವಳಿಗಳು (Algorithms)
ಅಲ್ಗಾರಿದಮ್ ಎಂದರೆ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಹಂತ-ಹಂತದ ವಿಧಾನ. ಪ್ರೋಗ್ರಾಮಿಂಗ್‌ನಲ್ಲಿ, ಕಾರ್ಯಕ್ರಮದ ತರ್ಕವನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಲು ಇವುಗಳನ್ನು ಬಳಸಲಾಗುತ್ತದೆ. ಫ್ಲೋಚಾರ್ಟ್‌ಗಳು ಅಲ್ಗಾರಿದಮ್‌ಗಳ ಚಿತ್ರಾತ್ಮಕ ನಿರೂಪಣೆಗಳಾಗಿವೆ.

6. ಸೈಬರ್ ಭದ್ರತೆ
ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಗುರುತನ್ನು ರಕ್ಷಿಸುವುದು ನಿರ್ಣಾಯಕ.
- ಯಾವಾಗಲೂ ಬಲವಾದ, ಅನನ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಬಳಸಿ.
- ಲಭ್ಯವಿದ್ದಾಗ ಟು-ಫ್ಯಾಕ್ಟರ್ ಅಥೆಂಟಿಕೇಶನ್ (2FA) ಸಕ್ರಿಯಗೊಳಿಸಿ.`
  },
  'ಗಣಿತ': { en: "", kn: "ದಯವಿಟ್ಟು ಇಂಗ್ಲಿಷ್/ಕನ್ನಡ ಭಾಷಾಂತರಕ್ಕಾಗಿ ಮೇಲಿನ ವಿವರವಾದ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ." },
  'ವಿಜ್ಞಾನ': { en: "", kn: "ದಯವಿಟ್ಟು ಇಂಗ್ಲಿಷ್/ಕನ್ನಡ ಭಾಷಾಂತರಕ್ಕಾಗಿ ಮೇಲಿನ ವಿವರವಾದ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ." },
  'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು': { en: "", kn: "ದಯವಿಟ್ಟು ಇಂಗ್ಲಿಷ್/ಕನ್ನಡ ಭಾಷಾಂತರಕ್ಕಾಗಿ ಮೇಲಿನ ವಿವರವಾದ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ." }
};
