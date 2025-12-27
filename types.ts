/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Attraction {
  id: string;
  name: string;
  category: string;
  image: string;
  ageGroup: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  ZONES = 'zones',
  PERKS = 'perks',
  TICKETS = 'tickets',
}