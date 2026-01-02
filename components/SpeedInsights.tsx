import React, { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';

/**
 * SpeedInsights component for Vercel Speed Insights integration
 * This component injects the Vercel Speed Insights tracking script
 * and should be included in your main app layout
 */
const SpeedInsights: React.FC = () => {
  useEffect(() => {
    // Inject Speed Insights only once when component mounts
    injectSpeedInsights();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default SpeedInsights;
