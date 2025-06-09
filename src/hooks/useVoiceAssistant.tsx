
import { useState, useCallback } from 'react';

interface VoiceAssistantHook {
  speak: (text: string, options?: SpeechSynthesisUtterance) => void;
  stop: () => void;
  isSpeaking: boolean;
  teachAbout: (module: string, content: string) => void;
  generateEducationalContent: (module: string) => string;
}

export const useVoiceAssistant = (): VoiceAssistantHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string, options?: Partial<SpeechSynthesisUtterance>) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options if provided
      if (options) {
        Object.assign(utterance, options);
      }
      
      // Default settings
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1;
      utterance.volume = options?.volume || 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const teachAbout = useCallback((module: string, content: string) => {
    const educationalContent = generateEducationalContent(module);
    const fullContent = `${content} ${educationalContent}`;
    speak(fullContent);
  }, [speak]);

  const generateEducationalContent = useCallback((module: string): string => {
    const contentMap: Record<string, string> = {
      'procurement': 'Procurement in SAP S/4HANA encompasses the complete procure-to-pay process. This includes purchase requisitions for internal requests, purchase orders for supplier commitments, goods receipt for delivery verification, and invoice verification for payment processing. The system supports strategic sourcing through RFQ management, supplier evaluation, and contract management. Advanced features include automated approval workflows, budget controls, and real-time analytics for spend optimization.',
      'Purchase Orders': 'Purchase Orders are formal commitments to suppliers for goods or services. The process begins with creating a PO from approved requisitions, selecting qualified suppliers, and defining delivery terms. Key features include multi-level approval workflows based on amount thresholds, automatic budget checks, delivery scheduling, and goods receipt matching. The system tracks order status from creation through delivery and supports change management for modifications.',
      'Supplier Management': 'Supplier Management maintains comprehensive vendor master data including qualification status, certifications, performance metrics, and risk assessments. The system supports vendor lifecycle management from registration through performance monitoring. Key capabilities include supplier scorecards, risk evaluation, contract compliance tracking, and automated performance reporting. Integration with procurement processes ensures only qualified suppliers can be selected for orders.',
      'Contract Management': 'Contract Management handles all supplier agreements including framework contracts, pricing agreements, and service level agreements. The system tracks contract terms, renewal dates, spending against contracts, and compliance requirements. Features include automated notifications for contract expirations, version control for amendments, and integration with purchase orders to enforce contracted terms and pricing.',
      'Source Determination': 'Source Determination identifies the optimal supplier for each procurement requirement based on predefined criteria such as price, quality, delivery capability, and strategic fit. The system evaluates supplier qualifications, contract terms, and performance history to recommend the best sourcing option. Advanced features include automated source selection rules and supplier rotation strategies.',
      'Goods Receipt': 'Goods Receipt processes incoming deliveries by verifying quantities, quality, and delivery terms against purchase orders. The system updates inventory records, triggers invoice verification, and handles discrepancies through exception management. Key features include mobile receipt processing, quality inspection workflows, and automatic GRN generation for accounting integration.',
      'Invoice Verification': 'Invoice Verification matches supplier invoices with purchase orders and goods receipts to ensure accurate payment processing. The system performs three-way matching to verify quantities, prices, and delivery confirmations. Features include automatic tolerance checking, discrepancy resolution workflows, and integration with accounts payable for payment release.',
      'Bidding & Auctions': 'Bidding & Auctions enables competitive sourcing through online bidding platforms and reverse auctions. The system supports multiple auction formats including sealed bid, open bidding, and reverse auctions. Features include supplier invitation management, bid evaluation criteria, and automated award recommendations based on total cost of ownership calculations.'
    };
    
    return contentMap[module] || 'This module provides comprehensive functionality for managing procurement processes in SAP S/4HANA with advanced workflow automation and analytics capabilities.';
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    teachAbout,
    generateEducationalContent
  };
};
