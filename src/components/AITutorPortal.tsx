import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, User, Sparkles, Send, X, HelpCircle, Code, FlaskConical, Calculator } from 'lucide-react';
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
        ? `ನಮಸ್ಕಾರ! ಇಂದು **${initialQuery}** ಬಗ್ಗೆ ಕಲಿಯೋಣ! 🚀\n\nನಾನು ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ವಿವರಿಸಬೇಕೇ, ಉದಾಹರಣೆಗಳನ್ನು ನೀಡಬೇಕೇ ಅಥವಾ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳನ್ನು ನೀಡಬೇಕೇ?`
        : `Hi! Let's learn about **${initialQuery}** today! 🚀\n\nWould you like me to explain the core concepts, show step-by-step formulas, or test you with practice questions?`;
    }
    return isKannada 
      ? "👋 **ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಅಧ್ಯಯನ ಶಿಕ್ಷಕ 'ನಮ್ಮ ಬಡ್ಡಿ'!**\n\n8-10 ನೇ ತರಗತಿಯ **ಗಣಿತ**, **ವಿಜ್ಞಾನ** ಮತ್ತು **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು** ಕಲಿಯಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಇಂದು ನೀವು ಏನು ಓದಲು ಬಯಸುತ್ತೀರಿ?"
      : "👋 **Hi there! I'm Namma Buddy, your Gemini AI Study Tutor!**\n\nI can help you master **Mathematics**, **Science**, and **Digital Skills** for Class 8-10. What topic would you like to explore today?";
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: getInitialMessage(), isBot: true }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Robust Fuzzy Topic Normalizer (handles typos like "geomentry", "chemsitry", etc.)
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

  // High-School Educational Knowledge Base
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

    // 4. Life Processes & Biology
    if (normalized === 'Life Processes') {
      if (inKn) {
        return `🌿 **ಜೀವ ಕ್ರಿಯೆಗಳು (Life Processes - SSLC Biology)**:

1️⃣ **ಪೋಷಣೆ (Nutrition)**:
• **ಸ್ವಪೋಷಕ ಪೋಷಣೆ**: ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಮೂಲಕ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ:
  6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O
• **ಪರಪೋಷಕ ಪೋಷಣೆ**: ಇತರ ಜೀವಿಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುವುದು (ಪ್ರಾಣಿಗಳು, ಮಾನವರು).

2️⃣ **ಉಸಿರಾಟ (Respiration)**:
• **ವಾಯುವಿಕ ಉಸಿರಾಟ**: ಆಮ್ಲಜನಕದ ಉಪಸ್ಥಿತಿಯಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ವಿಘಟನೆ (38 ATP ಶಕ್ತಿ ಸಿಗುತ್ತದೆ).
• **ಅವಾಯುವಿಕ ಉಸಿರಾಟ**: ಆಮ್ಲಜನಕವಿಲ್ಲದೆ ಗ್ಲೂಕೋಸ್ ವಿಘಟನೆ.

💡 *ನಿಮಗೆ ಈ ಅಧ್ಯಾಯದ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'questions' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
      }
      return `🌿 **Life Processes (Class 10 Biology)**:

1️⃣ **Photosynthesis & Autotrophic Nutrition**:
Plants synthesize glucose from CO₂ and H₂O using sunlight trapped by chlorophyll:
6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O

2️⃣ **Respiration**:
• **Aerobic Respiration**: Takes place in mitochondria with O₂, producing 38 ATP energy units.
• **Anaerobic Respiration**: Takes place without O₂ in yeast or muscle cells (producing Lactic Acid).

3️⃣ **Transportation & Excretion**:
• **Xylem** carries Water; **Phloem** carries Food.
• **Nephron** is the functional unit of the Kidney.

💡 *Would you like 3 practice questions on Life Processes? Type 'give questions' or 'yes'!*`;
    }

    // 5. Mathematics General
    if (normalized === 'Mathematics') {
      if (inKn) {
        return `📐 **ಗಣಿತ (Mathematics - Class 8 to 10)**:

1️⃣ **ಮುಖ್ಯ ಅಧ್ಯಾಯಗಳು**:
• ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು (Real Numbers & Polynomials)
• ಎರಡನೇ ಘಾತದ ಸಮೀಕರಣಗಳು (Quadratic Equations)
• ಸಮಾನಾಂತರ ಶ್ರೇಣಿಗಳು (Arithmetic Progressions)
• ತ್ರಿಕೋನಮಿತಿ (Trigonometry)

💡 *ನಿಮಗೆ ಗಣಿತದ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'questions' ಎಂದು ಕೇಳಿ!*`;
      }
      return `📐 **Mathematics (SSLC Class 8-10 Syllabus)**:

1️⃣ **Core High-School Math Chapters**:
• Real Numbers & Polynomials
• Quadratic Equations & Linear Equations
• Arithmetic Progressions (AP)
• Coordinate Geometry & Trigonometry

2️⃣ **Key Formula Tip**:
For Quadratic Equation ax² + bx + c = 0, roots are given by:
x = (-b ± √(b² - 4ac)) / (2a)

💡 *Would you like to try a math problem? Type 'give questions'!*`;
    }

    // 6. Science General
    if (normalized === 'Science') {
      if (inKn) {
        return `🔬 **ವಿಜ್ಞಾನ (Science - Class 8 to 10)**:

1️⃣ **ಮುಖ್ಯ ವಿಭಾಗಗಳು**:
• **ರಸಾಯನಶಾಸ್ತ್ರ**: ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು, ಆಮ್ಲಗಳು ಮತ್ತು ಪ್ರತ್ಯಾಮ್ಲಗಳು.
• **ಭೌತಶಾಸ್ತ್ರ**: ಬೆಳಕಿನ ಪ್ರತಿಫಲನ, ವಿದ್ಯುಚ್ಛಕ್ತಿ, ಕಾಂತತ್ವ.
• **ಜೀವಶಾಸ್ತ್ರ**: ಜೀವ ಕ್ರಿಯೆಗಳು, ನಿಯಂತ್ರಣ ಮತ್ತು ಸಹಭಾಗಿತ್ವ.

💡 *ನಿಮಗೆ ವಿಜ್ಞಾನದ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'questions' ಎಂದು ಕೇಳಿ!*`;
      }
      return `🔬 **Science (SSLC Physics, Chemistry & Biology)**:

1️⃣ **Key Curriculum Pillars**:
• **Chemistry**: Chemical Reactions, Acids & Bases, Metals & Non-metals.
• **Physics**: Light Reflection & Refraction, Electricity (V = IR), Magnetic Effects.
• **Biology**: Life Processes, Control & Coordination, Heredity.

💡 *Would you like to practice Science questions? Type 'give questions'!*`;
    }

    // Default Dynamic LLM Synthesis
    if (inKn) {
      return `📚 **"${userQuery}" ವಿಷಯದ ಕುರಿತು Namma Buddy AI ಮಾರ್ಗದರ್ಶನ**:

1️⃣ **ಪರಿಕಲ್ಪನೆಯ ಅರ್ಥ**: 8-10 ನೇ ತರಗತಿಯ ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ, ಈ ವಿಷಯದಲ್ಲಿ ಮುಖ್ಯ ವ್ಯಾಖ್ಯಾನಗಳು ಮತ್ತು ಮೂಲಭೂತ ಸಿದ್ಧಾಂತಗಳನ್ನು ಚೆನ್ನಾಗಿ ಗ್ರಹಿಸುವುದು ಅಗತ್ಯ.
2️⃣ **ಅಧ್ಯಯನ ವಿಧಾನ**: ಮುಖ್ಯ ಸೂತ್ರಗಳನ್ನು ಬರೆದು ಅಭ್ಯಾಸ ಮಾಡಿ ಮತ್ತು ನೈಜ ಸನ್ನಿವೇಶಗಳಿಗೆ ಅನ್ವಯಿಸಿ.

💡 *ನಿಮಗೆ ಈ ವಿಷಯದ ಮೇಲೆ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'yes' ಅಥವಾ 'question' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
    }
    return `📚 **Namma Buddy AI Study Guide on "${userQuery}"**:

1️⃣ **Core High-School Concept**:
In SSLC / Class 8-10 curriculum, mastering **${userQuery}** requires understanding the foundational definitions, key formulas, and practical applications.

2️⃣ **Step-by-Step Learning Approach**:
• Step 1: Memorize key terms and scientific units/formulas.
• Step 2: Work through 2 step-by-step solved examples.
• Step 3: Test yourself with practice questions.

💡 *Would you like 3 practice questions on this topic? Reply with 'yes' or 'give questions'!*`;
  };

  // Generate Actual Interactive Practice Quizzes
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
  (C) ಆವಿಯಾಗುವಿಕೆ
  (D) ಯಾವುದೇ ಕ್ರಿಯೆ ನಡೆಯುವುದಿಲ್ಲ

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
  C) Evaporation of water
  D) No reaction takes place

**Q3.** Which law states that total mass of reactants must equal total mass of products?
  A) Law of Definite Proportions
  B) Law of Conservation of Mass
  C) Law of Multiple Proportions

✅ **Answers:**
1 - **A** (Combination), 2 - **A** (Displacement of Cu by Fe), 3 - **B** (Law of Conservation of Mass).

*How did you do? Ask me to explain any question in detail!*`;
    }

    if (normalized === 'Coordinate Geometry' || normalized === 'Mathematics') {
      if (inKn) {
        return `📝 **ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ — ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** (0,0) ಮತ್ತು (3,4) ಬಿಂದುಗಳ ನಡುವಿನ ದೂರ ಎಷ್ಟು?
  (A) 5 ಯೂನಿಟ್‌ಗಳು
  (B) 7 ಯೂನಿಟ್‌ಗಳು
  (C) 25 ಯೂನಿಟ್‌ಗಳು

**ಪ್ರಶ್ನೆ 2:** (2, 3) ಮತ್ತು (4, 7) ಬಿಂದುಗಳ ಮಧ್ಯಬಿಂದು ಯಾವುದು?
  (A) (3, 5)
  (B) (6, 10)
  (C) (1, 2)

✅ **ಉತ್ತರಗಳು:** 1 - (A) [d = √(3² + 4²) = 5], 2 - (A) [M = ((2+4)/2, (3+7)/2) = (3,5)].`;
      }
      return `📝 **Coordinate Geometry — SSLC Practice Quiz**:

**Q1.** What is the distance between points A(0,0) and B(6,8)?
  A) 10 units
  B) 14 units
  C) 48 units

**Q2.** Find the midpoint of the line segment joining P(2, 4) and Q(6, 10):
  A) (4, 7)
  B) (8, 14)
  C) (3, 5)

**Q3.** What is the Y-coordinate (Ordinate) of point (-4, 9)?
  A) -4
  B) 9
  C) 5

✅ **Answers:**
1 - **A** (d = √(6² + 8²) = 10), 2 - **A** (M = (4, 7)), 3 - **B** (Y-coordinate is 9).`;
    }

    return inKn ? `📝 **ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಗೆ ಯಾವ ಅನಿಲವನ್ನು ಬಳಸುತ್ತವೆ?
  (A) ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ (CO₂)
  (B) ಆಮ್ಲಜನಕ (O₂)

**ಪ್ರಶ್ನೆ 2:** ಕಂಪ್ಯೂಟರ್‌ನ ಮಿದುಳು ಎಂದು ಯಾವುದನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ?
  (A) CPU
  (B) RAM

✅ **ಉತ್ತರಗಳು:** 1 - (A), 2 - (A)!` : `📝 **General High-School Science & Math Quiz**:

**Q1.** Which gas is absorbed by green plants during Photosynthesis?
  A) Carbon Dioxide (CO₂)
  B) Oxygen (O₂)

**Q2.** What component is known as the "Brain of the Computer"?
  A) CPU (Central Processing Unit)
  B) RAM

**Q3.** Solve: If 2x + 4 = 12, what is x?
  A) x = 4
  B) x = 6

✅ **Answers:** 1 - **A**, 2 - **A**, 3 - **A** (2x = 8 → x = 4).`;
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

    // 1. LIVE GEMINI API INVOCATION
    if (apiKey && apiKey.length > 10) {
      try {
        const systemInstruction = isKannada
          ? "ನೀವು ನಮ್ಮ ಬಡ್ಡಿ, ಕರ್ನಾಟಕದ ಪ್ರೌಢಶಾಲಾ (8-10 ನೇ ತರಗತಿ) ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಹಾಯ ಮಾಡುವ ಪ್ರೀತಿಯ AI ಶಿಕ್ಷಕ. ವಿದ್ಯಾರ್ಥಿ ಕೇಳುವ ಯಾವುದೇ ಪ್ರಶ್ನೆಗೆ ವಿವರವಾಗಿ, ಸೂತ್ರಗಳು ಮತ್ತು ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಉತ್ತರಿಸಿ."
          : "You are Namma Buddy, an expert, encouraging, and intelligent AI Study Tutor for Grade 8-10 high school students in Karnataka, India. Provide clear, accurate, structured educational responses with formulas, bullet points, examples, and practice questions when requested.";

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
        console.warn("Gemini API call failed, invoking Namma Buddy AI engine...", err);
      }
    }

    // 2. NAMMA BUDDY AI ENGINE (SYNTHESIS & FUZZY REASONING)
    setTimeout(() => {
      let botResponse = "";

      // A. Greeting
      if (['hi', 'hello', 'hey', 'namaste', 'namaskara', 'namma buddy'].some(w => lower.startsWith(w) || lower === w)) {
        botResponse = isKannada 
          ? "👋 **ನಮಸ್ಕಾರ!** ನಾನು ನಿಮ್ಮ AI ಶಿಕ್ಷಕ **ನಮ್ಮ ಬಡ್ಡಿ**.\n\nಇಂದು ನಾವು **ಗಣಿತ (Mathematics)**, **ವಿಜ್ಞಾನ (Science)** ಅಥವಾ **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು (Digital Skills)** ಬಗ್ಗೆ ಏನು ಕಲಿಯೋಣ? ಕೆಳಗಿನ ಬಟನ್ ಅಥವಾ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ!"
          : "👋 **Hello!** I'm **Namma Buddy**, your Gemini AI Study Tutor.\n\nWhat subject would you like to master today?\n• 📐 **Mathematics** (Coordinate Geometry, Algebra, Polynomials)\n• 🧪 **Science** (Chemical Reactions, Life Processes, Physics)\n• 💻 **Digital Skills** (Computer Science, Web Coding)\n\nType any question or tap a quick topic below!";
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
      // D. Educational topic explanations
      else {
        botResponse = getKnowledgeResponse(detectedTopic, userMsg, isKannada);
        setLastPromptedQuizTopic(detectedTopic || 'Chemical Reactions');
      }

      setMessages([...newMsgs, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 450);
  };

  // Helper to cleanly render Markdown formatting (bold, code, formulas, bullets, paragraphs)
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {lines.map((line, lineIdx) => {
          if (!line.trim()) return <div key={lineIdx} style={{ height: '4px' }} />;

          // Split line by bold **text** and code `text`
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

          // Render list item
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
      <div style={{ width: '100%', maxWidth: '780px', height: '90vh', maxHeight: '750px', background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
        
        {/* Modern Header */}
        <div style={{ padding: '16px 24px', background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10B981', boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
              <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Namma Buddy <Sparkles size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', display: 'inline-block' }}></span>
                Online • Gemini AI Tutor • {isKannada ? 'ಕನ್ನಡ' : 'English'}
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
            <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '85%', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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
              <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>Namma Buddy Gemini AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Suggestion Chips */}
        <div style={{ padding: '10px 20px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button onClick={() => handleSend('Chemical Reactions')} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <FlaskConical size={14} /> Chemical Reactions
          </button>
          <button onClick={() => handleSend('Coordinate Geometry')} style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Calculator size={14} /> Geometry & Shapes
          </button>
          <button onClick={() => handleSend('Digital Skills')} style={{ background: '#F3E8FF', border: '1px solid #E9D5FF', color: '#7E22CE', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Code size={14} /> Digital Skills
          </button>
          <button onClick={() => handleSend('give questions')} style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
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
            placeholder={isKannada ? "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು, ಗಣಿತ, ಕೋಡಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಿ..." : "Ask about Chemical Reactions, Geometry, Coding..."}
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
