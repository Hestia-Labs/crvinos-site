'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionScreenProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ 
  isVisible, 
  onAnimationComplete 
}) => {
  // Fixed animation duration - reduced for faster transitions
  const animationDuration = 1.5;
  
  // This handles whether the component should be rendered at all
  const [shouldRender, setShouldRender] = useState(isVisible);
  
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  // This handles the animation complete event for the container
  const handleExitComplete = () => {
    if (!isVisible) {
      setShouldRender(false);
      // Call the completion callback when the exit animation is done
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div 
          key="transition-screen"
          className="fixed inset-0 z-[1000] bg-accred flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ pointerEvents: 'all' }}
        >
          <div className="relative w-[400px] h-[550px] flex items-center justify-center">
            {/* Logo SVG with improved path implementation */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="-40 -30 150 100" 
              width="520" 
              height="340" 
              fill="none"
              style={{
                overflow: 'visible',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              {/* Animated wrapper */}
              <motion.g
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Circle element */}
                <motion.ellipse
                  cx="39.057" 
                  cy="8.302" 
                  rx="3.050" 
                  ry="3.050"
                  stroke="#FFFBF7"
                  strokeWidth="0.5"
                  fill="transparent"
                  initial={{ pathLength: 0,    opacity: 0 }}
                  animate={{ 
                    pathLength: 1.05,
                    opacity: 1,
                    transition: {
                        pathLength: { 
                          duration: animationDuration * 0.95, 
                          ease: "easeInOut"
                        }
                      }
                  }}
                />
                
                {/* Main logo path with animation - extended to ensure closure */}
                <motion.path 
                  d="M19.883 7.864C20.116 8.597 20.301 9.351 20.637 10.043C21.322 11.482 22.295 11.955 23.789 11.770C24.036 11.742 24.290 11.708 24.495 11.564C24.660 11.455 24.769 11.290 24.872 11.126C25.537 10.036 24.043 8.021 23.570 7.076C22.117 4.122 20.096 -0.504 15.936 0.079C14.387 0.291 12.564 1.628 11.331 2.525C7.802 5.102 5.369 8.933 3.738 12.921C2.073 17.012 0.921 21.316 0.325 25.688C-0.216 29.670 -0.162 34.049 1.106 37.900C2.223 41.299 4.916 44.205 8.083 45.822C11.824 47.734 15.559 47.172 19.191 45.191C22.549 43.362 26.003 41.052 28.374 38.010C30.745 34.967 32.218 31.513 34.542 28.525C35.110 27.792 35.892 27.086 36.817 26.860C37.858 26.613 38.578 27.168 39.332 27.812C40.915 29.162 42.039 30.978 42.888 32.863C44.142 35.652 45.328 38.763 46.000 41.744C46.212 42.690 46.342 43.656 46.335 44.623C46.335 44.945 46.150 45.719 46.383 45.870C46.699 46.075 47.548 45.904 47.877 45.801C49.166 45.404 49.474 43.807 49.570 42.635C49.728 40.853 48.987 38.996 48.378 37.352C47.555 35.124 46.452 33.117 45.198 31.116C43.855 28.964 42.450 26.853 40.983 24.783C40.387 23.941 40.010 23.495 41.203 23.077C46.952 21.076 52.702 18.678 58.040 15.738C61.384 13.894 64.742 11.886 67.072 8.782C67.751 7.877 68.340 6.897 68.813 5.863C69.203 5.006 69.916 3.622 69.409 2.676C68.484 3.067 67.614 3.581 66.730 4.060C66.003 4.458 65.112 4.773 64.831 5.643C64.770 5.835 64.742 6.034 64.701 6.233C64.448 7.446 63.577 8.398 62.789 9.303C60.809 11.585 58.253 13.243 55.614 14.669C52.798 16.190 49.961 17.718 47.034 19.027C45.136 19.877 42.779 21.193 40.641 20.555C40.181 20.418 39.715 20.192 39.482 19.774C38.838 18.636 40.024 16.889 40.641 15.978C41.449 14.785 42.436 13.737 43.437 12.709C46.041 10.036 49.268 8.014 52.633 6.452C54.244 5.705 55.909 5.013 57.608 4.506C59.657 3.896 61.795 3.642 63.879 3.169C64.674 2.991 65.304 2.518 65.989 2.121C66.168 2.018 68.128 0.709 68.093 0.675C67.339 0.017 66.051 -0.120 65.119 0.093C62.974 0.579 60.870 1.340 58.780 2.025C55.354 3.149 52.023 4.574 48.885 6.356C47.295 7.261 45.753 8.254 44.273 9.337C43.231 10.098 41.018 12.325 40.408 12.983C40.312 13.092 40.250 13.154 40.250 13.168C40.106 14.381 40.079 15.930 39.208 16.889C37.331 18.952 35.453 21.062 33.699 23.276C33.431 23.612 32.883 24.139 32.828 24.585C32.753 25.133 33.294 25.496 33.349 26.003C33.418 26.709 32.952 27.621 32.671 28.244C30.752 32.575 27.737 36.516 23.981 39.408C20.226 42.299 15.100 44.739 10.474 42.916C9.069 42.361 7.760 41.525 6.753 40.394C3.772 37.050 3.731 32.205 3.882 27.991C4.087 22.166 5.204 15.998 8.165 10.900C9.707 8.241 13.140 3.930 16.662 4.526C18.054 4.759 19.129 5.876 19.630 7.151C19.719 7.384 19.801 7.617 19.876 7.850"
                  stroke="#FFFBF7" 
                  strokeWidth="0.5"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.5"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ 
                    pathLength: 1.05, 
                    opacity: 1,
                    transition: {
                      pathLength: { 
                        duration: animationDuration * 0.95, 
                        ease: "easeInOut"
                      }
                    }
                  }}
                />
                
                {/* Explicit connecting path to ensure closure */}
                <motion.path
                  d="M19.876 7.850 L19.879 7.857 L19.881 7.860 L19.883 7.864"
                  stroke="#FFFBF7"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    transition: {
                      pathLength: { 
                        duration: 0.1,
                        delay: animationDuration * 0.85, 
                        ease: "easeInOut"
                      }
                    }
                  }}
                />
               
              </motion.g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionScreen; 