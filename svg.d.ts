// svg.d.ts

declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
    export default ReactComponent;
}