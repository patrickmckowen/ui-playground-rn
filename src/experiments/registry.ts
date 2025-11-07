import React from 'react';

export type ExperimentMeta = {
  slug: string;
  title: string;
  description?: string;
  Screen: React.ComponentType;
};

// @experiments-import
import { Screen as BouncyCardsScreen } from './bouncy-cards/Screen';
import { Screen as StretchyHeaderScreen } from './stretchy-header/Screen';

export const experiments: ExperimentMeta[] = [
  // @experiments-list
  {
    slug: 'bouncy-cards',
    title: 'Bouncy Cards',
    description: 'Springy draggable card stack using Gesture Handler + Reanimated',
    Screen: BouncyCardsScreen,
  },
  {
    slug: 'stretchy-header',
    title: 'Stretchy Header',
    description: 'Scroll-linked header that stretches and fades with content',
    Screen: StretchyHeaderScreen,
  },
];

export function getExperiment(slug: string) {
  return experiments.find((e) => e.slug === slug);
}
