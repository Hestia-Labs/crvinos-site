'use client';

import TransitionLink from '@/components/NewTransitionLink';

export default function TransitionLinkExample() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Transition Link Examples</h1>
      
      <div className="flex gap-4">
        <TransitionLink 
          href="/" 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Home
        </TransitionLink>
        
        <TransitionLink 
          href="/about" 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          About
        </TransitionLink>
        
        <TransitionLink 
          href="/catalog" 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Catalog
        </TransitionLink>
        
        <TransitionLink 
          href="/experiences" 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Experiences
        </TransitionLink>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl mb-2">External links (no transition)</h2>
        <TransitionLink 
          href="https://example.com" 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          External Website
        </TransitionLink>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl mb-2">Anchor links (no transition)</h2>
        <TransitionLink 
          href="#section" 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Jump to Section
        </TransitionLink>
      </div>
    </div>
  );
} 