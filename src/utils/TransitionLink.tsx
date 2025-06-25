'use client';

// Re-export the new TransitionLink from components
import TransitionLink, { TransitionProvider, useTransition } from '@/components/TransitionLink';

export { TransitionProvider, useTransition };
export const { TransitionLink: OldTransitionLink } = { TransitionLink };
export default TransitionLink;


