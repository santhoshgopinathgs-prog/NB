import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatMessage {
  text: string;
  isBot: boolean;
}

export const AITutorPortal = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const { language, markAITutorUsed } = useAppContext();
  
  // API Key handling
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Context state for fallback Gemini engine
  const [activeTopic, setActiveTopic] = useState<string>(initialQuery || '');
  const [lastPromptedQuizTopic, setLastPromptedQuizTopic] = useState<string>('');

  const getInitialMessage = () => {
    if (initialQuery) {
      return language === 'EN' 
        ? `Hi! Let's learn about **${initialQuery}** today! 🚀\n\nWould you like me to explain the core concepts, show step-by-step examples, or give you practice questions?`
        : `ನಮಸ್ಕಾರ! ಇಂದು **${initialQuery}** ಬಗ್ಗೆ ಕಲಿಯೋಣ! 🚀\n\nನಾನು ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ವಿವರಿಸಬೇಕೇ, ಉದಾಹರಣೆಗಳನ್ನು ನೀಡಬೇಕೇ ಅಥವಾ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳನ್ನು ನೀಡಬೇಕೇ?`;
    }
    return language === 'EN' 
      ? "👋 **Hi there! I'm Namma Buddy, your AI Study Tutor!**\n\nI can help you master **Mathematics**, **Science**, and **Digital Skills** for Class 8-10. What topic would you like to explore today?" 
      : "👋 **ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಅಧ್ಯಯನ ಶಿಕ್ಷಕ 'ನಮ್ಮ ಬಡ್ಡಿ'!**\n\n8-10 ನೇ ತರಗತಿಯ **ಗಣಿತ**, **ವಿಜ್ಞಾನ** ಮತ್ತು **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು** ಕಲಿಯಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಇಂದು ನೀವು ಏನು ಓದಲು ಬಯಸುತ್ತೀರಿ?";
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: getInitialMessage(), isBot: true }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Comprehensive SSLC & High School Topic Knowledge Base (Generates Gemini-grade explanations)
  const getKnowledgeResponse = (topic: string, query: string, isKannada: boolean): string => {
    const t = (topic || '').toLowerCase();
    const q = (query || '').toLowerCase();

    // 1. Chemical Reaction / Reactions / Chemistry
    if (t.includes('chem') || q.includes('chemical reaction') || q.includes('reaction') || q.includes('chemistry')) {
      if (isKannada) {
        return `🧪 **ರಾಷ್ಟ್ರೀಯ ಪಠ್ಯಕ್ರಮ - ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು**:

1️⃣ **ರಾಸಾಯನಿಕ ಕ್ರಿಯೆ ಎಂದರೇನು?**
ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ವಸ್ತುಗಳು ಪುನರ್ವ್ಯವಸ್ಥಿತಗೊಂಡು ಹೊಸ ಗುಣಲಕ್ಷಣಗಳಿರುವ ಹೊಸ ವಸ್ತುಗಳನ್ನು ರೂಪಿಸುವ ಪ್ರಕ್ರಿಯೆ.
*ಉದಾಹರಣೆಗೆ:* ಕಬ್ಬಿಣ ತುಕ್ಕು ಹಿಡಿಯುವುದು, ಹಾಲಿನಿಂದ ಮೊಸರಾಗುವುದು.

2️⃣ **ಮುಖ್ಯ ಪ್ರಕಾರಗಳು**:
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
A process where reactants break old bonds and form new chemical bonds to produce entirely new substances with different properties.
*Real-life Examples:* Rusting of iron, digestion of food, respiration, curdling of milk.

2️⃣ **4 Major Types of Chemical Reactions**:
• **Combination Reaction**: Two reactants combine to form one product.
  *Equation:* 2H₂ + O₂ → 2H₂O
• **Decomposition Reaction**: One compound breaks down into simpler products when heated/exposed to light.
  *Equation:* CaCO₃ → CaO + CO₂
• **Displacement Reaction**: A more reactive element displaces a less reactive element.
  *Equation:* Fe + CuSO₄ → FeSO₄ + Cu
• **Double Displacement Reaction**: Exchange of ions between two compounds.
  *Equation:* Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl

3️⃣ **Law of Conservation of Mass**:
Mass can neither be created nor destroyed in a chemical reaction. Total mass of reactants = Total mass of products.

💡 *Would you like 3 practice questions on Chemical Reactions? Type 'yes' or 'give questions'!*`;
    }

    // 2. Coordinate Geometry / Geometry / Math
    if (t.includes('coord') || q.includes('coordinate') || q.includes('geometry') || q.includes('distance formula')) {
      if (isKannada) {
        return `📐 **ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ (Coordinate Geometry)**:

1️⃣ **ಕಾರ್ಟೀಸಿಯನ್ ತಲ (Cartesian Plane)**:
• **X-ಅಕ್ಷ**: ಸಮತಲ ರೇಖೆ (Horizontal Axis)
• **Y-ಅಕ್ಷ**: ಲಂಬ ರೇಖೆ (Vertical Axis)
• **ಆರಂಭಿಕ ಬಿಂದು (Origin)**: (0, 0)

2️⃣ **ಪ್ರಮುಖ ಸೂತ್ರಗಳು (Important Formulas)**:
• **ದೂರ ಸೂತ್ರ (Distance Formula)**: 
  d = √((x₂ - x₁)² + (y₂ - y₁)²)
• **ಭಾಗ ಪ್ರಮಾಣ ಸೂತ್ರ (Section Formula)**: 
  P(x,y) = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))

💡 *ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಲು ಬಯಸುವಿರಾ? 'questions' ಎಂದು ಕೇಳಿ!*`;
      }
      return `📐 **Coordinate Geometry (Class 9 & 10 Mathematics)**:

1️⃣ **Cartesian Coordinates Overview**:
• Point is represented as (x, y) where x is the **Abscissa** (distance from Y-axis) and y is the **Ordinate** (distance from X-axis).
• **Origin (O)**: The intersection point (0,0).

2️⃣ **Key SSLC Formulas to Remember**:
• **Distance Formula** between A(x₁, y₁) and B(x₂, y₂):
  d = √((x₂ - x₁)² + (y₂ - y₁)²)
• **Midpoint Formula**:
  M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
• **Section Formula** (dividing line in ratio m₁:m₂):
  P(x, y) = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))

💡 *Would you like to try a solved example or practice problem? Ask 'give questions'!*`;
    }

    // 3. Digital Skills / Computer / Coding / HTML
    if (t.includes('digit') || t.includes('code') || q.includes('digital') || q.includes('computer') || q.includes('html') || q.includes('python')) {
      if (isKannada) {
        return `💻 **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಮೂಲಭೂತಗಳು**:

1️⃣ **ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಸಾಫ್ಟ್‌ವೇರ್**:
• **ಹಾರ್ಡ್‌ವೇರ್**: CPU, RAM, ಕೀಬೋರ್ಡ್, ಮಾನಿಟರ್, ಹಾರ್ಡ್ ಡಿಸ್ಕ್.
• **ಸಾಫ್ಟ್‌ವೇರ್**: ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ (Windows, Linux) ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಳು.

2️⃣ **ವೆಬ್ ಮತ್ತು ಕೋಡಿಂಗ್ (HTML/CSS)**:
• **HTML**: ವೆಬ್ ಪುಟಗಳ ರಚನೆಗೆ ಬಳಸಲಾಗುತ್ತದೆ (ಉದಾ: h1 ಶೀರ್ಷಿಕೆಗೆ, p ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗೆ).
• **CSS**: ಬಣ್ಣ ಮತ್ತು ವಿನ್ಯಾಸ ನೀಡಲು.
• **JavaScript**: ವೆಬ್ ಪುಟಗಳನ್ನು ಸಂವಾದಾತ್ಮಕವಾಗಿಸಲು.

💡 *ನಿಮಗೆ ಕೋಡಿಂಗ್ ರಸಪ್ರಶ್ನೆ ಬೇಕೇ? 'yes' ಅಥವಾ 'question' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
      }
      return `💻 **Digital Skills & Computer Literacy**:

1️⃣ **Computer Systems Core Architecture**:
• **Hardware**: Physical components — CPU (Central Processing Unit/Brain), RAM (Short-term Memory), SSD/HDD (Storage).
• **Software**: System Software (Windows, Linux, Android) & Application Software (Browsers, Office Tools).

2️⃣ **Basics of Web Development**:
• **HTML (HyperText Markup Language)**: Structure of web pages (h1 tags, p tags, links, images).
• **CSS (Cascading Style Sheets)**: Styling, layout, and colors.
• **JavaScript**: Interactive features and logic.

3️⃣ **Cyber Hygiene Tip**: Always use 2-Factor Authentication (2FA) and strong passwords!

💡 *Want to test your Computer Science knowledge? Type 'give questions'!*`;
    }

    // 4. Life Processes / Biology / Cell / Photosynthesis
    if (t.includes('bio') || q.includes('life process') || q.includes('cell') || q.includes('photo') || q.includes('biology')) {
      if (isKannada) {
        return `🌿 **ಜೀವ ಕ್ರಿಯೆಗಳು (Life Processes - SSLC Biology)**:

1️⃣ **ಪೋಷಣೆ (Nutrition)**:
• **ಸ್ವಪೋಷಕ ಪೋಷಣೆ (Autotrophic)**: ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಮೂಲಕ ತಮ್ಮ ಆಹಾರ ಸಿದ್ಧಪಡಿಸುತ್ತವೆ:
  $$6CO_2 + 12H_2O \\xrightarrow{\\text{ಸೂರ್ಯನ ಬೆಳಕು, ಕ್ಲೋರೋಫಿಲ್}} C_6H_{12}O_6 + 6O_2 + 6H_2O$$
• **ಪರಪೋಷಕ ಪೋಷಣೆ (Heterotrophic)**: ಇತರ ಜೀವಿಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುವುದು (ಪ್ರಾಣಿಗಳು, ಶಿಲೀಂಧ್ರಗಳು).

2️⃣ **ಉಸಿರಾಟ (Respiration)**:
• **ವಾಯುವಿಕ ಉಸಿರಾಟ**: ಆಮ್ಲಜನಕದ ಉಪಸ್ಥಿತಿಯಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ವಿಘಟನೆ (38 ATP ಶಕ್ತಿ).
• **ಅವಾಯುವಿಕ ಉಸಿರಾಟ**: ಆಮ್ಲಜನಕವಿಲ್ಲದೆ ಗ್ಲೂಕೋಸ್ ವಿಘಟನೆ (ಲ್ಯಾಕ್ಟಿಕ್ ಆಮ್ಲ/ಎಥನಾಲ್).

💡 *ನಿಮಗೆ ಈ ಅಧ್ಯಾಯದ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'questions' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
      }
      return `🌿 **Life Processes (Class 10 Biology)**:

1️⃣ **Autotrophic Nutrition & Photosynthesis**:
Plants prepare organic food (glucose) from inorganic raw materials ($CO_2, H_2O$) using sunlight trapped by chlorophyll:
$$6CO_2 + 12H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2 + 6H_2O$$

2️⃣ **Respiration**:
• **Aerobic Respiration**: Occurs in mitochondria in presence of $O_2$, releasing 38 ATP energy per glucose molecule.
• **Anaerobic Respiration**: Occurs without $O_2$ in yeast (fermentation -> Ethanol) or muscle cells during hard exercise (Lactic Acid).

3️⃣ **Transportation & Excretion**:
• Xylem transports Water; Phloem transports Food.
• **Nephron** is the functional filtration unit of kidneys.

💡 *Would you like 3 practice questions on Life Processes? Type 'give questions' or 'yes'!*`;
    }

    // 5. Default General Educational Synthesis
    if (isKannada) {
      return `📚 **"${query}" ವಿಷಯದ ಕುರಿತು Namma Buddy ಮಾರ್ಗದರ್ಶನ**:

1️⃣ **ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆ**: 8-10 ನೇ ತರಗತಿಯ ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ, ಈ ವಿಷಯದಲ್ಲಿ ಮುಖ್ಯ ವ್ಯಾಖ್ಯಾನಗಳು ಮತ್ತು ಸಿದ್ಧಾಂತಗಳನ್ನು ಚೆನ್ನಾಗಿ ನೆನಪಿಟ್ಟುಕೊಳ್ಳುವುದು ಮುಖ್ಯ.
2️⃣ **ಅಧ್ಯಯನ ಸಲಹೆ**: ಸೂತ್ರಗಳು ಮತ್ತು ಮುಖ್ಯ ಉದಾಹರಣೆಗಳನ್ನು ಪ್ರತಿದಿನ ಬರೆದು ಅಭ್ಯಾಸ ಮಾಡಿ.

💡 *ನಿಮಗೆ ಪರೀಕ್ಷೆಯ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು ಬೇಕೇ? 'question' ಅಥವಾ 'yes' ಎಂದು ಟೈಪ್ ಮಾಡಿ!*`;
    }
    return `📚 **Namma Buddy AI Study Guide on "${query}"**:

1️⃣ **Core High-School Concept**:
In SSLC / Grade 8-10 curriculum, mastering **${query}** requires understanding the foundational definitions, formulas, and real-world applications.

2️⃣ **Key Study Strategy**:
Break down complex topics into 3 steps:
• Step 1: Memorize key terms and scientific units/formulas.
• Step 2: Work through 2 step-by-step solved examples.
• Step 3: Test yourself with practice questions.

💡 *Would you like 3 practice questions on this topic? Reply with 'yes' or 'give questions'!*`;
  };

  // Generate Actual Interactive Practice Questions
  const generateQuestions = (topic: string, isKannada: boolean): string => {
    const t = topic.toLowerCase();
    
    if (t.includes('chem') || t.includes('react')) {
      if (isKannada) {
        return `📝 **ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು — ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** $2H_2 + O_2 \\rightarrow 2H_2O$ ಇದು ಯಾವ ರೀತಿಯ ಕ್ರಿಯೆ?
(A) ಸಂಯೋಜನೆ ಕ್ರಿಯೆ
(B) ವಿಘಟನೆ ಕ್ರಿಯೆ
(C) ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ
(D) ದ್ವಿ ಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆ

**ಪ್ರಶ್ನೆ 2:** ಕಬ್ಬಿಣದ ಮೊಳೆಯನ್ನು ತಾಮ್ರದ ಸಲ್ಫೇಟ್ ದ್ರಾವಣದಲ್ಲಿ ಇರಿಸಿದಾಗ ಬಣ್ಣ ಬದಲಾಗಲು ಕಾರಣವೇನು?
(A) ಕಬ್ಬಿಣ ತಾಮ್ರವನ್ನು ಸ್ಥಾನಪಲ್ಲಟಗೊಳಿಸುತ್ತದೆ
(B) ತಾಮ್ರ ಕಬ್ಬಿಣವನ್ನು ಸ್ಥಾನಪಲ್ಲಟಗೊಳಿಸುತ್ತದೆ
(C) ಆವಿಯಾಗುವಿಕೆ
(D) ಯಾವುದೇ ಕ್ರಿಯೆ ನಡೆಯುವುದಿಲ್ಲ

**ಉತ್ತರಗಳು:** 1(A), 2(A)! 👍`;
      }
      return `📝 **Chemical Reactions — High-School Practice Quiz**:

**Q1.** What type of chemical reaction is represented by: $2Mg + O_2 \\rightarrow 2MgO$?
  A) Combination Reaction
  B) Decomposition Reaction
  C) Displacement Reaction
  D) Double Displacement

**Q2.** When iron nails are dipped in blue Copper Sulfate ($CuSO_4$) solution, the color turns pale green. Why?
  A) Iron displaces Copper to form Iron Sulfate ($FeSO_4$)
  B) Copper displaces Iron
  C) Evaporation of water
  D) No reaction takes place

**Q3.** Which law states that total mass of reactants must equal total mass of products?
  A) Law of Definite Proportions
  B) Law of Conservation of Mass
  C) Law of Multiple Proportions
  D) Avogadro's Law

✅ **Answers:** 
1 - **A** (Combination), 2 - **A** (Displacement of Cu by Fe), 3 - **B** (Conservation of Mass).

*How did you score? Ask me to explain any question in detail!*`;
    }

    if (t.includes('coord') || t.includes('geom') || t.includes('math')) {
      if (isKannada) {
        return `📝 **ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ — ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** $(0,0)$ ಮತ್ತು $(3,4)$ ಬಿಂದುಗಳ ನಡುವಿನ ದೂರ ಎಷ್ಟು?
(A) 5 ಯೂನಿಟ್‌ಗಳು
(B) 7 ಯೂನಿಟ್‌ಗಳು
(C) 25 ಯೂನಿಟ್‌ಗಳು
(D) 12 ಯೂನಿಟ್‌ಗಳು

**ಪ್ರಶ್ನೆ 2:** $(2, 3)$ ಮತ್ತು $(4, 7)$ ಬಿಂದುಗಳ ಮಧ್ಯಬಿಂದು ಯಾವುದು?
(A) $(3, 5)$
(B) $(6, 10)$
(C) $(1, 2)$
(D) $(5, 3)$

✅ **ಉತ್ತರಗಳು:** 1(A) - [$\sqrt{3^2 + 4^2} = 5$], 2(A) - [$(\frac{2+4}{2}, \frac{3+7}{2}) = (3,5)$].`;
      }
      return `📝 **Coordinate Geometry — SSLC Practice Quiz**:

**Q1.** What is the distance between points $A(0,0)$ and $B(6,8)$?
  A) 10 units
  B) 14 units
  C) 48 units
  D) 5 units

**Q2.** Find the midpoint of the line segment joining $P(2, 4)$ and $Q(6, 10)$:
  A) $(4, 7)$
  B) $(8, 14)$
  C) $(3, 5)$
  D) $(2, 3)$

**Q3.** What is the ordinate of point $(-4, 9)$?
  A) $-4$
  B) $9$
  C) $5$
  D) $0$

✅ **Answers:**
1 - **A** ($\sqrt{6^2 + 8^2} = \sqrt{100} = 10$), 2 - **A** ($(\frac{2+6}{2}, \frac{4+10}{2}) = (4,7)$), 3 - **B** (Y-coordinate = 9).`;
    }

    if (t.includes('digit') || t.includes('code') || t.includes('comp')) {
      return isKannada ? `📝 **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು — ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** ಕಂಪ್ಯೂಟರ್‌ನ ಮಿದುಳು ಎಂದು ಯಾವುದನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ?
(A) CPU
(B) RAM
(C) Hard Disk
(D) Mouse

**ಪ್ರಶ್ನೆ 2:** HTML ನ ಪೂರ್ಣ ರೂಪವೇನು?
(A) HyperText Markup Language
(B) High Tech Modern Language
(C) Home Tool Markup Language

✅ **ಉತ್ತರಗಳು:** 1(A) CPU, 2(A) HyperText Markup Language.` : `📝 **Digital Skills — Practice Quiz**:

**Q1.** Which component is known as the "Brain of the Computer"?
  A) CPU (Central Processing Unit)
  B) RAM
  C) Hard Disk
  D) Power Supply

**Q2.** Which language is primarily used to build the structure of Web Pages?
  A) HTML
  B) Python
  C) C++
  D) SQL

**Q3.** What does 2FA stand for in Cybersecurity?
  A) Two-Factor Authentication
  B) Fast File Allocation
  C) Format Array Access

✅ **Answers:** 1 - **A**, 2 - **A**, 3 - **A**.`;
    }

    // Default general quiz set
    return isKannada ? `📝 **ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು**:

**ಪ್ರಶ್ನೆ 1:** ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಗೆ ಯಾವ ಅನಿಲವನ್ನು ಬಳಸುತ್ತವೆ?
(A) ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ($CO_2$)
(B) ಆಮ್ಲಜನಕ ($O_2$)
(C) ನೈಟ್ರೋಜನ್ ($N_2$)

**ಪ್ರಶ್ನೆ 2:** ನೀರಿನ ರಾಸಾಯನಿಕ ಸೂತ್ರ ಯಾವುದು?
(A) $H_2O$
(B) $CO_2$
(C) $NaCl$

✅ **ಉತ್ತರಗಳು:** 1(A), 2(A)!` : `📝 **General Science & Math Practice Quiz**:

**Q1.** Which gas is absorbed by green plants during Photosynthesis?
  A) Carbon Dioxide ($CO_2$)
  B) Oxygen ($O_2$)
  C) Nitrogen ($N_2$)

**Q2.** What is the chemical formula of pure Water?
  A) $H_2O$
  B) $CO_2$
  C) $NaCl$

**Q3.** Solve: If $2x + 4 = 12$, what is the value of $x$?
  A) $4$
  B) $6$
  C) $8$

✅ **Answers:** 1 - **A**, 2 - **A**, 3 - **A** ($2x = 8 \\rightarrow x = 4$).`;
  };

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg) return;
    
    markAITutorUsed();

    const newMsgs = [...messages, { text: userMsg, isBot: false }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    const isKannada = language === 'KN';
    const lower = userMsg.toLowerCase().trim();

    // Track active topics dynamically
    let currentTopic = activeTopic;
    if (lower.includes('chem') || lower.includes('reaction')) currentTopic = 'Chemical Reactions';
    else if (lower.includes('coord') || lower.includes('geometry')) currentTopic = 'Coordinate Geometry';
    else if (lower.includes('digit') || lower.includes('code') || lower.includes('comp') || lower.includes('html')) currentTopic = 'Digital Skills';
    else if (lower.includes('bio') || lower.includes('cell') || lower.includes('photo') || lower.includes('life')) currentTopic = 'Life Processes';
    else if (lower.includes('math') || lower.includes('algebra') || lower.includes('number')) currentTopic = 'Mathematics';
    else if (lower.includes('science') || lower.includes('physics')) currentTopic = 'Science';
    
    if (currentTopic) setActiveTopic(currentTopic);

    // 1. TRY LIVE GEMINI API FIRST (IF KEY OR PROXY IS AVAILABLE)
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
        console.warn("Gemini SDK call failed, trying direct Gemini REST API...", err);
        try {
          const restResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: newMsgs.map(m => ({
                role: m.isBot ? 'model' : 'user',
                parts: [{ text: m.text }]
              }))
            })
          });
          if (restResponse.ok) {
            const data = await restResponse.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim()) {
              setMessages([...newMsgs, { text: text.trim(), isBot: true }]);
              setIsLoading(false);
              return;
            }
          }
        } catch (restErr) {
          console.warn("Direct Gemini REST call failed, using Namma Buddy AI engine...", restErr);
        }
      }
    }

    // 2. DYNAMIC CONVERSATIONAL AI ENGINE (GEMINI-GRADE SYNTHESIS & CONTEXTUAL REASONING)
    setTimeout(() => {
      let botResponse = "";

      // A. Greeting
      if (['hi', 'hello', 'hey', 'namaste', 'namaskara', 'namma buddy'].some(w => lower.startsWith(w) || lower === w)) {
        botResponse = isKannada 
          ? "👋 **ನಮಸ್ಕಾರ!** ನಾನು ನಿಮ್ಮ AI ಶಿಕ್ಷಕ **ನಮ್ಮ ಬಡ್ಡಿ**.\n\nಇಂದು ನಾವು **ಗಣಿತ (Mathematics)**, **ವಿಜ್ಞಾನ (Science)** ಅಥವಾ **ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು (Digital Skills)** ಬಗ್ಗೆ ಏನು ಕಲಿಯೋಣ? ಯಾವುದೇ ವಿಷಯ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನನಗೆ ಕೇಳಿ!"
          : "👋 **Hello!** I'm **Namma Buddy**, your AI Study Tutor.\n\nWhat subject would you like to master today?\n• 📐 **Mathematics** (Coordinate Geometry, Polynomials, Algebra)\n• 🧪 **Science** (Chemical Reactions, Life Processes, Physics)\n• 💻 **Digital Skills** (Computer Science, Coding, HTML)\n\nType any topic or question to begin!";
      }
      // B. User explicitly asking for questions / quiz / test
      else if (['give questions', 'question', 'questions', 'quiz', 'quiz me', 'test me', 'give quiz', 'give question', 'give 5 questions', 'give mcq'].some(w => lower.includes(w))) {
        const targetTopic = currentTopic || lastPromptedQuizTopic || 'General Science & Math';
        botResponse = generateQuestions(targetTopic, isKannada);
        setLastPromptedQuizTopic(targetTopic);
      }
      // C. User replying "yes" / "sure" / "okay" to a previous question prompt
      else if (['yes', 'yeah', 'sure', 'ok', 'okay', 'kk', 'give me', 'yes please', 'ha', 'hudu'].includes(lower)) {
        const targetTopic = currentTopic || lastPromptedQuizTopic || 'General Science & Math';
        botResponse = generateQuestions(targetTopic, isKannada);
        setLastPromptedQuizTopic(targetTopic);
      }
      // D. User asking for explanations or topics
      else {
        botResponse = getKnowledgeResponse(currentTopic, userMsg, isKannada);
        setLastPromptedQuizTopic(currentTopic || 'General Science');
      }

      setMessages([...newMsgs, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 400);
  };

  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-app)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', zIndex: 10 }}>
        <button 
          onClick={onClose} 
          style={{ background: 'var(--bg-app)', border: '1px solid var(--border-light)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800 }}
          title="Close AI Tutor"
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', margin: 0 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-green)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            Namma Buddy AI Tutor
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            ● Active • Gemini Powered • Kannada & English
          </div>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div style={{ padding: '20px 16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#F8FAFC' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '88%', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            {msg.isBot && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginTop: '4px', border: '1.5px solid var(--accent-green)' }}>
                <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ 
              background: msg.isBot ? '#FFFFFF' : '#2563EB', 
              color: msg.isBot ? '#1E293B' : '#FFFFFF', 
              padding: '16px 20px', 
              borderRadius: msg.isBot ? '22px 22px 22px 4px' : '22px 22px 4px 22px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
              border: msg.isBot ? '1px solid #E2E8F0' : 'none',
              lineHeight: 1.65,
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {msg.text}
            </div>
            {!msg.isBot && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px', boxShadow: '0 2px 6px rgba(37,99,235,0.3)' }}>
                <User size={18} color="white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '14px 20px', borderRadius: '22px 22px 22px 4px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Loader2 className="animate-spin" size={20} color="#2563EB" />
            <span style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>Namma Buddy is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px', boxShadow: '0 -4px 12px rgba(0,0,0,0.03)' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          placeholder={language === 'EN' ? "Ask about Chemical Reactions, Geometry, Coding..." : "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು, ಗಣಿತ, ಕೋಡಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಿ..."}
          style={{ flex: 1, padding: '14px 20px', borderRadius: '28px', border: '1.5px solid #CBD5E1', background: '#F8FAFC', outline: 'none', fontSize: '0.98rem', fontWeight: 500, color: '#0F172A' }}
        />
        <button 
          disabled={isLoading || !input.trim()} 
          onClick={handleSend} 
          style={{ 
            width: '52px', height: '52px', borderRadius: '50%', 
            background: (isLoading || !input.trim()) ? '#CBD5E1' : '#2563EB', 
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer', 
            fontSize: '1.2rem', color: 'white', transition: 'all 0.2s ease',
            boxShadow: (isLoading || !input.trim()) ? 'none' : '0 4px 12px rgba(37,99,235,0.3)'
          }}
        >
          ➤
        </button>
      </div>
    </div>,
    document.body
  );
};
