
import { useCallback, useEffect, useState } from 'react';

export const useVoiceAssistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechQueue, setSpeechQueue] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Initialize speech synthesis
  useEffect(() => {
    // Safely check if speechSynthesis is available in the window object
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Initial voices load
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          
          // Try to find a female English voice
          const femaleVoice = availableVoices.find(
            voice => voice.name.includes('Female') || 
                    voice.name.includes('female') || 
                    voice.name.includes('Samantha') ||
                    (voice.name.includes('Google') && voice.lang.includes('en-US'))
          );
          
          // Fallback to any English voice
          const englishVoice = availableVoices.find(
            voice => voice.lang.includes('en')
          );
          
          setPreferredVoice(femaleVoice || englishVoice || availableVoices[0]);
        }
      };
      
      // Load voices initially
      loadVoices();
      
      // Chrome loads voices asynchronously - only attach the event if it exists
      if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      console.warn("Speech synthesis not available in this browser");
    }

    // Cleanup function
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Process speech queue
  useEffect(() => {
    if (speechQueue.length > 0 && !isSpeaking && speechSynthesis) {
      const text = speechQueue[0];
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsActive(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeechQueue(current => current.slice(1));
        if (speechQueue.length <= 1) {
          setIsActive(false);
        }
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeechQueue(current => current.slice(1));
        if (speechQueue.length <= 1) {
          setIsActive(false);
        }
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [speechQueue, isSpeaking, speechSynthesis, preferredVoice]);

  // Speak text function
  const speak = useCallback((text: string) => {
    if (!text.trim()) return;
    
    // Stop current speech before adding new text to queue
    if (speechSynthesis && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    // Add to queue
    setSpeechQueue(current => [...current, text]);
  }, [isSpeaking, speechSynthesis]);

  // Stop speaking
  const stop = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechQueue([]);
      setIsActive(false);
    }
  }, [speechSynthesis]);

  // Generate detailed educational content
  const generateEducationalContent = useCallback((topic: string, detail?: string) => {
    const educationalContent = {
      "finance": `Finance module in SAP S/4HANA is designed for comprehensive financial management. 
      It includes functionalities for general ledger accounting, accounts receivable, accounts payable, 
      asset accounting, and financial reporting. For example, you can use the General Ledger section to 
      record and track all financial transactions, while the Accounts Receivable section helps manage 
      customer payments and outstanding invoices. The predictive accounting features use AI to forecast 
      financial outcomes based on historical data and current trends.`,
      
      "manufacturing": `The Manufacturing module in SAP S/4HANA supports all aspects of production planning 
      and execution. It includes tools for production scheduling, material requirements planning, shop floor 
      control, and quality management. For instance, you can use the Production Orders tile to create and 
      schedule manufacturing orders, and the Material Requirements tile to ensure all necessary components 
      are available for production. This module integrates with Inventory Management to provide a complete 
      view of your supply chain.`,
      
      "procurement": `The Procurement module handles all purchasing activities, from vendor management to 
      purchase order processing. It streamlines the procurement process by providing tools for vendor evaluation, 
      contract management, and purchase requisition approval. For example, the Create Purchase Order tile 
      allows you to generate new orders for goods or services, while the Supplier Directory provides access 
      to your approved vendor list with performance ratings and contract terms.`,
      
      "sales": `The Sales module manages all customer-facing transactions and relationships. It includes 
      functionality for sales order processing, quotation management, pricing, and customer relationship 
      management. The Create Sales Order tile, for example, allows you to input new customer orders with 
      appropriate products, quantities, and pricing. The Customer Analytics section provides insights into 
      buying patterns and preferences to help drive sales strategies.`,
      
      "project": `Project Management in SAP S/4HANA helps plan, execute, and monitor projects of all sizes. 
      It includes tools for project planning, resource allocation, time tracking, and project accounting. 
      For instance, you can use the Active Projects tile to monitor ongoing projects and their status, 
      while the Resource Planning tile helps allocate personnel and equipment to specific project tasks.`,
      
      "trial": `The Trial Center provides a safe environment to explore and learn SAP S/4HANA features. 
      It includes educational resources like tutorials and documentation, as well as a sandbox environment 
      for practicing without affecting real data. The Tutorials tile provides step-by-step guides for learning 
      specific functionalities, while the Sandbox Environment allows you to test processes in an isolated system.`,
      
      "default": `SAP S/4HANA is an integrated enterprise resource planning (ERP) system designed to help 
      organizations run their business processes efficiently. It combines transactional processing with 
      real-time analytics, providing insights for better decision-making. The system is organized into modules 
      like Finance, Manufacturing, Procurement, Sales, and Project Management, each addressing specific 
      business functions while maintaining data integration across the organization.`
    };
    
    const content = educationalContent[topic.toLowerCase() as keyof typeof educationalContent] || 
                    educationalContent.default;
    
    if (detail) {
      return `${detail} ${content}`;
    }
    
    return content;
  }, []);

  // Speak educational content
  const teachAbout = useCallback((topic: string, detail?: string) => {
    const content = generateEducationalContent(topic, detail);
    speak(content);
  }, [generateEducationalContent, speak]);

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    preferredVoice,
    generateEducationalContent,
    teachAbout,
    isActive: speechQueue.length > 0 || isSpeaking
  };
};
