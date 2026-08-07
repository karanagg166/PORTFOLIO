'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production') {
      // Log web vitals for performance monitoring
      console.log(metric)
    }
  })
  
  return null
}
