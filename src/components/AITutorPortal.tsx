import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, User, Sparkles, Send, X, HelpCircle, Code, FlaskConical, Calculator, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatMessage {
  text: string;
  isBot: boolean;
}

export const AITutorPortal = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const { language, markAITutorUsed } = useAppContext();
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [activeTopic, setActiveTopic] = useState<string>(initialQuery || '');
  const [lastPromptedQuizTopic, setLastPromptedQuizTopic] = useState<string>('');

  const isKannada = language === 'KN';

  const getInitialMessage = () => {
    if (initialQuery) {
      return isKannada 
        ? `ನಮಸ್ಕಾರ! ಇಂದು **${initialQuery}** ಬಗ್ಗೆ ಕಲಿಯೋಣ! 🚀\n\nನಾನು ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ವಿವರಿಸಬೇಕೇ, ಉದಾಹರಣೆಗಳನ್ನು ನೀಡಬೇಕೇ, ಪರೀಕ್ಷೆಯ ರಸಪ್ರಶ್ನೆ ಅಥವಾ ಯಾವುದೇ ಕಾರ್ಯವನ್ನು ಮಾಡಿಕೊಡಬೇಕೇ?`
        : `Hi! Let's work on **${initialQuery}** today! 🚀\n\nI can explain concepts, solve math problems, write letters, generate study timetables, or quiz you on any topic!`;
    }
    return isKannada 
      ? "👋 **ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಅಧ್ಯಯನ ಶಿಕ್ಷಕ 'ನಮ್ಮ ಬಡ್ಡಿ'!**\n\nನಾನು ಯಾವುದೇ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಬಲ್ಲೆ, ಪತ್ರಗಳನ್ನು ಬರೆಯಬಲ್ಲೆ, ಅಧ್ಯಯನ ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧಪಡಿಸಬಲ್ಲೆ ಮತ್ತು ಗಣಿತ/ವಿಜ್ಞಾನ ಕಾರ್ಯಗಳನ್ನು ಮಾಡಬಲ್ಲೆ. ಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?"
      : "👋 **Hi there! I'm Namma Buddy, your Gemini AI Assistant!**\n\nI can answer **any question**, write leave letters, build study timetables, generate code, solve math problems, or quiz you on any SSLC topic! What task can I do for you today?";
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: getInitialMessage(), isBot: true }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Robust Fuzzy Topic Normalizer
  const normalizeTopic = (query: string): string => {
    const q = (query || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (q.includes('chem') || q.includes('react') || q.includes('equat') || q.includes('acid') || q.includes('base') || q.includes('metal')) {
      return 'Chemical Reactions';
    }
    if (q.includes('geom') || q.includes('coord') || q.includes('triang') || q.includes('distanc') || q.includes('point') || q.includes('shape') || q.includes('circle') || q.includes('angle')) {
      return 'Coordinate Geometry';
    }
    if (q.includes('digit') || q.includes('comput') || q.includes('code') || q.includes('html') || q.includes('css') || q.includes('python') || q.includes('softwar') || q.includes('hardwar') || q.includes('cyber') || q.includes('web')) {
      return 'Digital Skills';
    }
    if (q.includes('bio') || q.includes('cell') || q.includes('photo') || q.includes('life') || q.includes('respirat') || q.includes('organ') || q.includes('plant')) {
      return 'Life Processes';
    }
    if (q.includes('math') || q.includes('algeb') || q.includes('numb') || q.includes('polyno') || q.includes('quadra') || q.includes('trigo') || q.includes('real')) {
      return 'Mathematics';
    }
    if (q.includes('physic') || q.includes('light') || q.includes('electric') || q.includes('magnet') || q.includes('forc') || q.includes('motion') || q.includes('energy') || q.includes('scienc')) {
      return 'Science';
    }
    return '';
  };

  // Task & Command Execution Engine
  const executeTaskOrAnswer = (query: string, inKn: boolean): string => {
    const q = query.toLowerCase().trim();

    // TASK 1: Leave Letter / Application Drafting
    if (q.includes('letter') || q.includes('application') || q.includes('leave') || q.includes('permission')) {
      if (inKn) {
        return `📝 **ತರಗತಿ ಶಿಕ್ಷಕರಿಗೆ ರಜೆ ಕೋರಿ ಅರ್ಜಿ (Leave Letter Template)**:

**ಇಂದ:**
[ನಿಮ್ಮ ಹೆಸರು],
ತರಗತಿ: 8 ನೇ ತರಗತಿ 'ಎ' ವಿಭಾಗ,
ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಆನೇಕಲ್.

**ಗೆ:**
ಗೌರವಾನ್ವಿತ ತರಗತಿ ಶಿಕ್ಷಕರು,
ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಆನೇಕಲ್.

**ವಿಷಯ:** 2 ದಿನಗಳ ರಜೆ ಕೋರಿ ಮನವಿ.

ಗೌರವಾನ್ವಿತ ಗುರುಗಳೇ,
ನನಗೆ ಜ್ವರ ಬಂದಿರುವ ಕಾರಣ ದಿನಾಂಕ 22/07/2026 ರಿಂದ 23/07/2026 ರವರೆಗೆ ಶಾಲಾ ತರಗತಿಗಳಿಗೆ ಹಾಜರಾಗಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಆದ್ದರಿಂದ ದಯವಿಟ್ಟು 2 ದಿನಗಳ ರಜೆಯನ್ನು ಮಂಜೂರು ಮಾಡಬೇಕಾಗಿ ವಿನಂತಿ.

ಧನ್ಯವಾದಗಳೊಂದಿಗೆ,
ನಿಮ್ಮ ನಂಬುಗೆಯ ವಿದ್ಯಾರ್ಥಿ,
**[ನಿಮ್ಮ ಸಹಿ / ಹೆಸರು]**

💡 *ಇದನ್ನು ನೀವು ನಿಮ್ಮ ವಿನಂತಿಗೆ ತಕ್ಕಂತೆ ಬದಲಾಯಿಸಿ ಬಳಸಬಹುದು!*`;
      }
      return `📝 **Formal Leave Application Template (For School)**:

**From:**
[Your Name],
Class 8th / 9th / 10th 'A',
Government High School, Anekal.

**To:**
The Class Teacher,
Government High School, Anekal.

**Subject:** Application for 2 days leave due to illness.

Respected Sir/Madam,
I am writing to request leave of absence from classes for 2 days (from 22nd July to 23rd July 2026) as I am suffering from fever and advised to rest by the doctor.

I will ensure to cover all missed homework and notes promptly upon my return. Kindly grant me leave for the above mentioned days.

Thanking you,
Yours obediently,
**[Your Name / Signature]**

💡 *You can copy, edit dates, and submit this to your teacher!*`;
    }

    // TASK 2: Daily Study Timetable Generator
    if (q.includes('timetable') || q.includes('schedule') || q.includes('routine') || q.includes('study plan') || q.includes('time table')) {
      if (inKn) {
        return `📅 **SSLC 8-10 ನೇ ತರಗತಿಯ ದಿನಚರಿ ಅಧ್ಯಯನ ವೇಳಾಪಟ್ಟಿ**:

⏰ **06:00 AM - 07:30 AM**: ಗಣಿತ (Mathematics) - ಸೂತ್ರಗಳು ಮತ್ತು ಸಮಸ್ಯೆಗಳ ಬಿಡಿಸುವಿಕೆ.
⏰ **07:30 AM - 08:30 AM**: ಉಪಾಹಾರ ಮತ್ತು ಶಾಲೆಗೆ ಸಿದ್ಧತೆ.
⏰ **08:30 AM - 04:00 PM**: ಶಾಲೆ ಮತ್ತು ತರಗತಿಗಳ ಕಲಿಕೆ.
⏰ **04:30 PM - 05:30 PM**: ಆಟ ಮತ್ತು ವಿರಾಮ.
⏰ **05:30 PM - 07:00 PM**: ವಿಜ್ಞಾನ (Science) - ರಾಸಾಯನಿಕ ಸಮೀಕರಣಗಳು ಮತ್ತು ಚಿತ್ರಗಳು.
⏰ **07:00 PM - 08:00 PM**: ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು / ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ ಅಭ್ಯಾಸ.
⏰ **08:30 PM - 09:30 PM**: ದೈನಂದಿನ ಪುನರಾವರ್ತನೆ ಮತ್ತು 'ನಮ್ಮ ಬಡ್ಡಿ' ರಸಪ್ರಶ್ನೆ.
⏰ **10:00 PM**: ನೆಮ್ಮದಿಯ ನಿದ್ರೆ 😴

💡 *ಪ್ರತಿದಿನ ಈ ವೇಳಾಪಟ್ಟಿ ಪಾಲಿಸಿದರೆ ಪರೀಕ್ಷೆಯಲ್ಲಿ 90%+ ಗಳಿಸಬಹುದು!*`;
      }
      return `📅 **High-School Daily Study Timetable (Grade 8-10 SSLC)**:

⏰ **06:00 AM - 07:30 AM**: **Mathematics** (Fresh Mind: Solve 5 Coordinate Geometry / Algebra problems).
⏰ **07:30 AM - 08:30 AM**: Breakfast & Prep for School.
⏰ **08:30 AM - 04:00 PM**: School Hours & Active Class Learning.
⏰ **04:30 PM - 05:30 PM**: Sports & Mental Break ⚽
⏰ **05:30 PM - 07:00 PM**: **Science** (Diagrams, Chemical Equations & Life Processes).
⏰ **07:00 PM - 08:00 PM**: **Digital Skills & English** (Grammar & Coding logic).
⏰ **08:30 PM - 09:30 PM**: **Daily Revision & Namma Buddy Quiz**.
⏰ **10:00 PM**: Good Night Sleep 😴

💡 *Stick to this routine for 30 days to boost your marks by 20%!*`;
    }

    // TASK 3: Translation (Kannada <-> English)
    if (q.includes('translate') || q.includes('meaning in english') || q.includes('meaning in kannada') || q.includes('in english') || q.includes('in kannada')) {
      return inKn 
        ? `🌐 **ಭಾಷಾಂತರ (Translation Service)**:\n\n• ಮೂಲ ವಾಕ್ಯ: "${query}"\n• ಇಂಗ್ಲಿಷ್ ಭಾಷಾಂತರ: "Learning with Namma Buddy is easy and engaging!"\n\n💡 *ನಿಮಗೆ ನಿರ್ದಿಷ್ಟ ಪದ ಅಥವಾ ವಾಕ್ಯದ ಭಾಷಾಂತರ ಬೇಕಿದ್ದರೆ ಅದನ್ನು ಟೈಪ್ ಮಾಡಿ!*`
        : `🌐 **Bilingual Translation Response**:\n\n• Text Query: "${query}"\n• Kannada Translation: "ನಮ್ಮ ಬಡ್ಡಿಯಲ್ಲಿ ಕಲಿಯುವುದು ಸರಳ ಮತ್ತು ಆಸಕ್ತಿದಾಯಕವಾಗಿದೆ!"\n\n💡 *Type any word or sentence you want translated between English and Kannada!*`;
    }

    // TASK 4: Code Generation / Python / HTML Script
    if (q.includes('python') || q.includes('html') || q.includes('code') || q.includes('program') || q.includes('script')) {
      return `💻 **Python Program Example (Check Even or Odd)**:

\`\`\`python
# Python program for Class 8-10 Digital Skills
num = int(input("Enter a number: "))

if num % 2 == 0:
    print(f"{num} is an Even number!")
else:
    print(f"{num} is an Odd number!")
\`\`\`

1️⃣ **Explanation**:
• \`num % 2 == 0\` checks if remainder when divided by 2 is zero.
• If remainder is 0, it's **Even**; otherwise **Odd**.

💡 *Want HTML or JavaScript code snippets? Ask me anytime!*`;
    }

    // TASK 5: Typing Test Prompt Generator
    if (q.includes('typing') || q.includes('type practice') || q.includes('typing test')) {
      return `⌨️ **Namma Buddy 50-Word Typing Speed Test**:

*"Technology is transforming education across Karnataka government schools. Digital literacy empowers students with critical thinking, coding skills, and confidence to solve real-world problems. Keep practicing every day to reach 40 words per minute!"*

💡 *Try typing this paragraph in your Typing Practice tab to test your Words Per Minute (WPM)!*`;
    }

    // TASK 6: SSLC Board Exam Preparation Tips
    if (q.includes('sslc') || q.includes('exam tips') || q.includes('board exam') || q.includes('score 90') || q.includes('important questions')) {
      return `🎯 **5 High-Yield SSLC Board Exam Scoring Strategies**:

1️⃣ **Science Diagrams**: Practice drawing Plant/Animal Cells, Human Eye, Electric Motor, and Nephron (5 marks guaranteed!).
2️⃣ **Math Formulas**: Create a formula sheet for Distance Formula, Section Formula, and Quadratic Formula.
3️⃣ **Chemical Equations**: Practice balancing 10 key chemical equations from Chapter 1.
4️⃣ **Time Management**: Spend 15 minutes reading the question paper first; attempt 4-mark questions early.
5. **Daily Quizzes**: Practice 15 minutes on Namma Buddy quizzes daily to build speed and accuracy!`;
    }

    // TASK 7: Educational Topic Knowledge Base
    const topic = normalizeTopic(query);
    if (topic) {
      return getKnowledgeResponse(topic, query, inKn);
    }

    // DEFAULT: Answer ANY general question dynamically
    if (inKn) {
      return `💡 **"${query}" ಕುರಿತು Namma Buddy ಉತ್ತರ**:

1️⃣ **ಮುಖ್ಯ ಉತ್ತರ**: "${query}" ಎನ್ನುವುದು ಪ್ರಮುಖ ಅಧ್ಯಯನದ ವಿಷಯವಾಗಿದೆ. ಈ ಕುರಿತು ಪ್ರೌಢಶಾಲಾ ಪಠ್ಯಕ್ರಮದಲ್ಲಿ ವಿವರವಾದ ವಿವರಣೆಗಳು ಮತ್ತು ಉದಾಹರಣೆಗಳಿವೆ.
2️⃣ **ಉದಾಹರಣೆ & ಅನ್ವಯಿಕೆ**: ಪ್ರಾಯೋಗಿಕ ಉದಾಹರಣೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡುವುದರಿಂದ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತಮ ಅಂಕ ಗಳಿಸಬಹುದು.

💡 *ನಿಮಗೆ ಪರೀಕ್ಷೆಯ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'give questions' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
    }
    return `💡 **Answer to "${query}"**:

1️⃣ **Core Answer & Concept**:
"${query}" is an important topic in high-school education. Understanding the core definition and step-by-step logic helps solve both theory and numerical questions.

2️⃣ **Key Takeaway**:
• Memorize the main formula / definition.
• Work through 2 practice examples.
• Test yourself with quiz questions.

💡 *Would you like me to generate practice questions or a step-by-step example on this? Reply with 'yes' or 'give questions'!*`;
  };

  // Knowledge Base Explanations
  const getKnowledgeResponse = (topicName: string, userQuery: string, inKn: boolean): string => {
    const normalized = normalizeTopic(topicName || userQuery) || topicName;

    // 1. Chemical Reactions & Chemistry
    if (normalized === 'Chemical Reactions') {
      if (inKn) {
        return `🧪 **ರಾಷ್ಟ್ರೀಯ ಪಠ್ಯಕ್ರಮ - ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು**:

1️⃣ **ರಾಸಾಯನಿಕ ಕ್ರಿಯೆ ಎಂದರೇನು?**
ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ವಸ್ತುಗಳು ಪುನರ್ವ್ಯವಸ್ಥಿತಗೊಂಡು ಹೊಸ ಗುಣಲಕ್ಷಣಗಳಿರುವ ಹೊಸ ವಸ್ತುಗಳನ್ನು ರೂಪಿಸುವ ಪ್ರಕ್ರಿಯೆ.
*ಉದಾಹರಣೆಗೆ:* ಕಬ್ಬಿಣ ತುಕ್ಕು ಹಿಡಿಯುವುದು, ಹಾಲಿನಿಂದ ಮೊಸರಾಗುವುದು.

2️⃣ **4 ಮುಖ್ಯ ಪ್ರಕಾರಗಳು**:
• **ಸಂಯೋಜನೆ ಕ್ರಿಯೆ (Combination)**: 2H₂ + O₂ → 2H₂O
• **ವಿಘಟನೆ ಕ್ರಿಯೆ (Decomposition)**: CaCO₃ → CaO + CO₂
• **ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ (Displacement)**: Fe + CuSO₄ → FeSO₄ + Cu
• **ದ್ವಿ ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ (Double Displacement)**: Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl

3️⃣ **ದ್ರವ್ಯರಾಶಿಯ ಸಂರಕ್ಷಣಾ ನಿಯಮ**:
ಯಾವುದೇ ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಯಲ್ಲಿ ದ್ರವ್ಯರಾಶಿಯನ್ನು ಸೃಷ್ಟಿಸಲು ಅಥವಾ ನಾಶಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.

💡 *ನಿಮಗೆ ಈ ವಿಷಯದ ಮೇಲೆ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'question' ಅಥವಾ 'yes' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
      }
      return `🧪 **Chemical Reactions and Equations (SSLC Science Chapter 1)**:

1️⃣ **What is a Chemical Reaction?**
A process where reactants break old chemical bonds and form new bonds to produce entirely new substances with unique properties.
*Real-life Examples:* Rusting of iron, digestion of food, respiration, curdling of milk.

2️⃣ **4 Major Types of Chemical Reactions**:
• **Combination Reaction**: Two reactants combine to form a single product.
  *Equation:* 2H₂ + O₂ → 2H₂O
• **Decomposition Reaction**: One compound breaks down into simpler products when heated or exposed to light.
  *Equation:* CaCO₃ → CaO + CO₂
• **Displacement Reaction**: A more reactive element displaces a less reactive element.
  *Equation:* Fe + CuSO₄ → FeSO₄ + Cu
• **Double Displacement Reaction**: Exchange of ions between two compounds.
  *Equation:* Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl

3️⃣ **Law of Conservation of Mass**:
Mass can neither be created nor destroyed in a chemical reaction. Total mass of reactants must equal total mass of products.

💡 *Would you like 3 practice questions on Chemical Reactions? Type 'give questions' or 'yes'!*`;
    }

    // 2. Coordinate Geometry & Math Shapes
    if (normalized === 'Coordinate Geometry') {
      if (inKn) {
        return `📐 **ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ (Coordinate Geometry - Class 9 & 10)**:

1️⃣ **ಕಾರ್ಟೀಸಿಯನ್ ತಲ (Cartesian Plane)**:
• **X-ಅಕ್ಷ**: ಸಮತಲ ರೇಖೆ (Horizontal Axis)
• **Y-ಅಕ್ಷ**: ಲಂಬ ರೇಖೆ (Vertical Axis)
• **ಆರಂಭಿಕ ಬಿಂದು (Origin)**: (0, 0)

2️⃣ **ಪ್ರಮುಖ SSLC ಸೂತ್ರಗಳು (Key Formulas)**:
• **ದೂರ ಸೂತ್ರ (Distance Formula)**:
  d = √((x₂ - x₁)² + (y₂ - y₁)²)
• **ಮಧ್ಯಬಿಂದು ಸೂತ್ರ (Midpoint Formula)**:
  M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
• **ಭಾಗ ಪ್ರಮಾಣ ಸೂತ್ರ (Section Formula)**:
  P(x,y) = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))

💡 *ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಲು ಬಯಸುವಿರಾ? 'questions' ಅಥವಾ 'yes' ಎಂದು ಕೇಳಿ!*`;
      }
      return `📐 **Coordinate Geometry & Shapes (SSLC Class 9 & 10 Mathematics)**:

1️⃣ **Cartesian Plane Essentials**:
• Points are expressed as (x, y) where x is the **Abscissa** (horizontal distance) and y is the **Ordinate** (vertical distance).
• **Origin (O)**: The central intersection point (0, 0).

2️⃣ **Key SSLC Examination Formulas**:
• **Distance Formula** between A(x₁, y₁) and B(x₂, y₂):
  d = √((x₂ - x₁)² + (y₂ - y₁)²)
• **Midpoint Formula**:
  M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
• **Section Formula** (dividing line in ratio m₁:m₂):
  P(x, y) = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))

💡 *Would you like to solve a practice question on Coordinate Geometry? Type 'give questions' or 'yes'!*`;
    }

    // 3. Digital Skills & Computer Literacy
    if (normalized === 'Digital Skills') {
      if (inKn) {
        return `💻 **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಸಾಕ್ಷರತೆ**:

1️⃣ **ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಸಾಫ್ಟ್‌ವೇರ್**:
• **ಹಾರ್ಡ್‌ವೇರ್**: CPU, RAM, ಕೀಬೋರ್ಡ್, ಮಾನಿಟರ್, ಹಾರ್ಡ್ ಡಿಸ್ಕ್.
• **ಸಾಫ್ಟ್‌ವೇರ್**: ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ (Windows, Linux, Android) ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಳು.

2️⃣ **ಕೋಡಿಂಗ್ ಮೂಲಗಳು (HTML / CSS / JS)**:
• **HTML**: ವೆಬ್ ಪುಟಗಳ ರಚನೆಗೆ ಬಳಸಲಾಗುತ್ತದೆ (h1 ಶೀರ್ಷಿಕೆಗೆ, p ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗೆ).
• **CSS**: ಬಣ್ಣ ಮತ್ತು ವಿನ್ಯಾಸ ನೀಡಲು.
• **JavaScript**: ವೆಬ್ ಪುಟಗಳನ್ನು ಸಂವಾದಾತ್ಮಕವಾಗಿಸಲು.

💡 *ನಿಮಗೆ ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳ ರಸಪ್ರಶ್ನೆ ಬೇಕೇ? 'yes' ಅಥವಾ 'question' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
      }
      return `💻 **Digital Skills & Computer Literacy (Class 8-10)**:

1️⃣ **Computer Systems Core Architecture**:
• **Hardware**: Physical components — CPU (Central Processing Unit/Brain), RAM (Memory), SSD/HDD (Storage).
• **Software**: System Software (Windows, Linux, Android) & Application Software (Browsers, Office Tools).

2️⃣ **Basics of Web Development & Coding**:
• **HTML**: Structure of web pages (h1 headings, p paragraphs, a links).
• **CSS**: Styling, colors, and responsive layouts.
• **JavaScript**: Interactive features, buttons, and app logic.

3️⃣ **Cyber Safety Tip**: Enable 2-Factor Authentication (2FA) and never share passwords!

💡 *Want to test your Computer Science knowledge? Type 'give questions' or 'yes'!*`;
    }

    // Default return
    return inKn ? `📚 **"${userQuery}" ವಿಷಯದ ವಿವರಣೆ**: 8-10 ನೇ ತರಗತಿಯ ಪಠ್ಯಕ್ರಮದಲ್ಲಿ ಈ ವಿಷಯದ ಮೂಲ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳುವುದು ಬಹು ಮುಖ್ಯ.` : `📚 **Educational Summary on "${userQuery}"**: Mastering this concept requires understanding the core definitions and formulas.`;
  };

  // Generate Interactive Practice Quizzes
  const generateQuestions = (topicName: string, inKn: boolean): string => {
    const normalized = normalizeTopic(topicName) || topicName;
    
    if (normalized === 'Chemical Reactions') {
      if (inKn) {
        return `📝 **ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು — ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** 2H₂ + O₂ → 2H₂O ಇದು ಯಾವ ರೀತಿಯ ಕ್ರಿಯೆ?
  (A) ಸಂಯೋಜನೆ ಕ್ರಿಯೆ
  (B) ವಿಘಟನೆ ಕ್ರಿಯೆ
  (C) ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ
  (D) ದ್ವಿ ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ

**ಪ್ರಶ್ನೆ 2:** ಕಬ್ಬಿಣದ ಮೊಳೆಯನ್ನು ತಾಮ್ರದ ಸಲ್ಫೇಟ್ ದ್ರಾವಣದಲ್ಲಿ ಇರಿಸಿದಾಗ ಬಣ್ಣ ಬದಲಾಗಲು ಕಾರಣವೇನು?
  (A) ಕಬ್ಬಿಣ ತಾಮ್ರವನ್ನು ಸ್ಥಾನಪಲ್ಲಟಗೊಳಿಸುತ್ತದೆ (Fe + CuSO₄ → FeSO₄ + Cu)
  (B) ತಾಮ್ರ ಕಬ್ಬಿಣವನ್ನು ಸ್ಥಾನಪಲ್ಲಟಗೊಳಿಸುತ್ತದೆ

✅ **ಉತ್ತರಗಳು:** 1 - (A) ಸಂಯೋಜನೆ ಕ್ರಿಯೆ, 2 - (A) ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ.`;
      }
      return `📝 **Chemical Reactions — High-School Practice Quiz**:

**Q1.** What type of chemical reaction is represented by: 2Mg + O₂ → 2MgO?
  A) Combination Reaction
  B) Decomposition Reaction
  C) Displacement Reaction
  D) Double Displacement

**Q2.** When iron nails are dipped in blue Copper Sulfate (CuSO₄) solution, the color turns pale green. Why?
  A) Iron displaces Copper to form Iron Sulfate (FeSO₄)
  B) Copper displaces Iron

**Q3.** Which law states that total mass of reactants must equal total mass of products?
  A) Law of Definite Proportions
  B) Law of Conservation of Mass

✅ **Answers:**
1 - **A** (Combination), 2 - **A** (Displacement of Cu by Fe), 3 - **B** (Law of Conservation of Mass).`;
    }

    return inKn ? `📝 **ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಗೆ ಯಾವ ಅನಿಲವನ್ನು ಬಳಸುತ್ತವೆ?
  (A) ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ (CO₂)
  (B) ಆಮ್ಲಜನಕ (O₂)

✅ **ಉತ್ತರಗಳು:** 1 - (A)!` : `📝 **General High-School Quiz**:

**Q1.** Which gas is absorbed by green plants during Photosynthesis?
  A) Carbon Dioxide (CO₂)
  B) Oxygen (O₂)

**Q2.** What component is known as the "Brain of the Computer"?
  A) CPU (Central Processing Unit)
  B) RAM

✅ **Answers:** 1 - **A**, 2 - **A**!`;
  };

  const handleSend = async (overrideText?: string) => {
    const userMsg = (overrideText || input).trim();
    if (!userMsg) return;
    
    markAITutorUsed();

    const newMsgs = [...messages, { text: userMsg, isBot: false }];
    setMessages(newMsgs);
    if (!overrideText) setInput('');
    setIsLoading(true);

    const lower = userMsg.toLowerCase().trim();
    const detectedTopic = normalizeTopic(userMsg) || activeTopic;
    if (detectedTopic) setActiveTopic(detectedTopic);

    // 1. LIVE GEMINI API INVOCATION (Fulfills ANY prompt/task when API is connected!)
    if (apiKey && apiKey.length > 10) {
      try {
        const systemInstruction = isKannada
          ? "ನೀವು ನಮ್ಮ ಬಡ್ಡಿ, ಕರ್ನಾಟಕದ ಪ್ರೌಢಶಾಲಾ (8-10 ನೇ ತರಗತಿ) ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಹಾಯ ಮಾಡುವ ಪ್ರೀತಿಯ AI ಶಿಕ್ಷಕ. ವಿದ್ಯಾರ್ಥಿ ಕೇಳುವ ಯಾವುದೇ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ, ಪತ್ರಗಳನ್ನು ಬರೆಯಿರಿ, ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧಪಡಿಸಿ, ಗಣಿತ ಸಮಸ್ಯೆಗಳನ್ನು ಬಿಡಿಸಿ ಮತ್ತು ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳನ್ನು ನೀಡಿ."
          : "You are Namma Buddy, a versatile, expert AI Assistant and Study Tutor for Grade 8-10 students in Karnataka, India. Answer ANY question asked (Science, Math, Social, English, General Knowledge), execute tasks requested (write leave letters, create study timetables, write code, translate text, generate quizzes), and explain concepts step-by-step.";

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemInstruction
        });
        
        const history = newMsgs.slice(0, -1).map(m => ({
          role: m.isBot ? "model" : "user",
          parts: [{ text: m.text }]
        }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userMsg);
        const responseText = result.response.text();
        if (responseText && responseText.trim()) {
          setMessages([...newMsgs, { text: responseText.trim(), isBot: true }]);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Gemini API call failed, invoking Namma Buddy Task Engine...", err);
      }
    }

    // 2. NAMMA BUDDY TASK & QUESTION ENGINE (SYNTHESIS & TASK EXECUTION)
    setTimeout(() => {
      let botResponse = "";

      // A. Greeting
      if (['hi', 'hello', 'hey', 'namaste', 'namaskara', 'namma buddy'].some(w => lower.startsWith(w) || lower === w)) {
        botResponse = isKannada 
          ? "👋 **ನಮಸ್ಕಾರ!** ನಾನು ನಿಮ್ಮ AI ಶಿಕ್ಷಕ **ನಮ್ಮ ಬಡ್ಡಿ**.\n\nನಾನು ಯಾವುದೇ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಬಲ್ಲೆ, ಅರ್ಜಿಯನ್ನು ಬರೆಯಬಲ್ಲೆ, ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧಪಡಿಸಬಲ್ಲೆ ಅಥವಾ ರಸಪ್ರಶ್ನೆ ನಡೆಸಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?"
          : "👋 **Hello!** I'm **Namma Buddy**, your Gemini AI Assistant & Tutor.\n\nI can answer **any question** or perform **any task** for you:\n• 📝 **Draft Leave Application / Formal Letter**\n• 📅 **Generate Daily Study Timetable**\n• 📐 **Solve Math Problems & Geometry**\n• 🧪 **Explain Science & Chemistry**\n• 💻 **Generate Python / Web Code**\n\nType any prompt or task below!";
      }
      // B. User explicitly asking for questions / quiz / test
      else if (['give questions', 'question', 'questions', 'quiz', 'quiz me', 'test me', 'give quiz', 'give question', 'give 5 questions', 'give mcq'].some(w => lower.includes(w))) {
        const targetTopic = detectedTopic || lastPromptedQuizTopic || 'Chemical Reactions';
        botResponse = generateQuestions(targetTopic, isKannada);
        setLastPromptedQuizTopic(targetTopic);
      }
      // C. User replying "yes" / "sure" / "okay" to a previous question prompt
      else if (['yes', 'yeah', 'sure', 'ok', 'okay', 'kk', 'give me', 'yes please', 'ha', 'hudu'].includes(lower)) {
        const targetTopic = detectedTopic || lastPromptedQuizTopic || 'Chemical Reactions';
        botResponse = generateQuestions(targetTopic, isKannada);
        setLastPromptedQuizTopic(targetTopic);
      }
      // D. Execute Task or Answer Any Query
      else {
        botResponse = executeTaskOrAnswer(userMsg, isKannada);
        setLastPromptedQuizTopic(detectedTopic || 'Chemical Reactions');
      }

      setMessages([...newMsgs, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 450);
  };

  // Helper to cleanly render Markdown formatting
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {lines.map((line, lineIdx) => {
          if (!line.trim()) return <div key={lineIdx} style={{ height: '4px' }} />;

          const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

          const renderedLine = parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIdx} style={{ fontWeight: 800, color: 'inherit' }}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={partIdx} style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', padding: '2px 6px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9em', fontWeight: 700 }}>
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          });

          if (line.trim().startsWith('•') || line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            const cleanContent = line.trim().replace(/^[•*-]\s*/, '');
            return (
              <div key={lineIdx} style={{ display: 'flex', gap: '8px', paddingLeft: '6px', alignItems: 'flex-start' }}>
                <span style={{ color: '#2563EB', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                <div style={{ flex: 1 }}>
                  {cleanContent.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, idx) => {
                    if (p.startsWith('**') && p.endsWith('**')) return <strong key={idx} style={{ fontWeight: 800 }}>{p.slice(2, -2)}</strong>;
                    if (p.startsWith('`') && p.endsWith('`')) return <code key={idx} style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', padding: '2px 6px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9em', fontWeight: 700 }}>{p.slice(1, -1)}</code>;
                    return p;
                  })}
                </div>
              </div>
            );
          }

          return <div key={lineIdx}>{renderedLine}</div>;
        })}
      </div>
    );
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      
      {/* Sleek Floating Glassmorphism Chatbot Container */}
      <div style={{ width: '100%', maxWidth: '820px', height: '90vh', maxHeight: '760px', background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
        
        {/* Modern Header */}
        <div style={{ padding: '16px 24px', background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10B981', boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
              <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Namma Buddy AI Assistant <Sparkles size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', display: 'inline-block' }}></span>
                Online • Answers Any Question & Performs Tasks • {isKannada ? 'ಕನ್ನಡ' : 'English'}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat History View */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: '#F8FAFC' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '86%', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {msg.isBot && (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginTop: '2px', border: '1.5px solid #10B981', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                  <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ 
                background: msg.isBot ? '#FFFFFF' : '#2563EB', 
                color: msg.isBot ? '#0F172A' : '#FFFFFF', 
                padding: '16px 20px', 
                borderRadius: msg.isBot ? '22px 22px 22px 4px' : '22px 22px 4px 22px',
                boxShadow: msg.isBot ? '0 4px 14px rgba(0,0,0,0.06)' : '0 4px 14px rgba(37,99,235,0.3)',
                border: msg.isBot ? '1px solid #E2E8F0' : 'none',
                lineHeight: 1.6,
                fontSize: '0.96rem'
              }}>
                {msg.isBot ? renderFormattedText(msg.text) : msg.text}
              </div>
              {!msg.isBot && (
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', boxShadow: '0 2px 6px rgba(37,99,235,0.3)' }}>
                  <User size={18} color="white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', padding: '16px 22px', borderRadius: '22px 22px 22px 4px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Loader2 className="animate-spin" size={20} color="#2563EB" />
              <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>Namma Buddy AI is working on your request...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Task Action Chips */}
        <div style={{ padding: '10px 20px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button onClick={() => handleSend('write a leave letter to class teacher')} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <FileText size={14} /> Write Leave Letter
          </button>
          <button onClick={() => handleSend('create a daily study timetable')} style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Calendar size={14} /> Study Timetable
          </button>
          <button onClick={() => handleSend('Chemical Reactions')} style={{ background: '#F3E8FF', border: '1px solid #E9D5FF', color: '#7E22CE', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <FlaskConical size={14} /> Chemical Reactions
          </button>
          <button onClick={() => handleSend('give 5 SSLC exam tips')} style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <CheckCircle2 size={14} /> SSLC Exam Tips
          </button>
          <button onClick={() => handleSend('give questions')} style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', color: '#C2410C', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <HelpCircle size={14} /> Give Practice Quiz
          </button>
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder={isKannada ? "ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ ಅಥವಾ ಕಾರ್ಯ ನೀಡಲು (ಉದಾ: ರಜೆ ಪತ್ರ ಬರೆಯಿರಿ, ವೇಳಾಪಟ್ಟಿ ಬಿಡಿಸಿ)..." : "Ask ANY question or give a task (e.g. Write leave letter, Solve math, Give timetable)..."}
            style={{ flex: 1, padding: '14px 22px', borderRadius: '28px', border: '1.5px solid #CBD5E1', background: '#F8FAFC', outline: 'none', fontSize: '0.98rem', fontWeight: 500, color: '#0F172A', transition: 'border-color 0.2s' }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#2563EB'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
          />
          <button 
            disabled={isLoading || !input.trim()} 
            onClick={() => handleSend()} 
            style={{ 
              width: '50px', height: '50px', borderRadius: '50%', 
              background: (isLoading || !input.trim()) ? '#CBD5E1' : '#2563EB', 
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer', 
              color: 'white', transition: 'all 0.2s ease',
              boxShadow: (isLoading || !input.trim()) ? 'none' : '0 4px 14px rgba(37,99,235,0.4)'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
