/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ConceptType = 'A' | 'B' | 'C'; // A: Founder's Notebook, B: Creative Sandbox, C: Product Workshop

export type TabType = 'library' | 'overview' | 'homepage' | 'workspace' | 'constitution' | 'matrix' | 'settings';

export interface ColorSpec {
  name: string;
  hex: string;
  role: string;
  darkText: boolean;
}

export interface FontSpec {
  name: string;
  category: string;
  usage: string;
  pairing: string;
  example: string;
}

export interface BrandManifesto {
  philosophy: string;
  tagline: string;
  metaphor: string;
  accentStyles: string;
  strengths: string[];
  weaknesses: string[];
}

export interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'orange';
  handwritten: boolean;
  angle: number;
}

export interface Constitution {
  vision: string;
  corePrinciples: string[];
  successMetrics: string[];
  constraints: string[];
  forbiddenFeatures: string[];
}

export interface SandboxCard {
  id: string;
  type: 'vision' | 'user' | 'problem' | 'mvp' | 'roadmap' | 'suggestion' | 'notes';
  title: string;
  content: string;
  author?: string;
  status?: 'Approved' | 'Review' | 'Draft' | 'Constraint';
  tags?: string[];
  x?: number;
  y?: number;
}
