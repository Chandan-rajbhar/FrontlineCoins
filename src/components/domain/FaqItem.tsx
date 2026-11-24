import React from 'react';
import { AccordionItem } from '../ui/Accordion';
import { Faq } from '../../types';

interface FaqItemProps {
  faq: Faq;
  defaultOpen?: boolean;
}

export const FaqItem: React.FC<FaqItemProps> = ({ faq, defaultOpen = false }) => {
  return (
    <AccordionItem id={faq.id} title={faq.question} defaultOpen={defaultOpen}>
      {faq.answer}
    </AccordionItem>
  );
};
