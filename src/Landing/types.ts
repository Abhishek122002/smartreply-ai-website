import React from 'react';

export type Tone = 'Professional' | 'Formal' | 'Friendly';
export type Length = 'Short' | 'Medium' | 'Long';

export interface GenerateReplyParams {
  context?: string;
  points: string;
  tone: Tone;
  length: Length;
}

export interface Testimonial {
  role: string;
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}