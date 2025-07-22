import React, { Suspense } from 'react';
import SurveyAnalytics from './Responses';


export default function ResponseOpinionPage() {
  return (
    <Suspense fallback={<div>Loading Responses...</div>}>
      <SurveyAnalytics />
    </Suspense>
  );
}
