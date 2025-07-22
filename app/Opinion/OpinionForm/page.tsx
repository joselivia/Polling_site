import React, { Suspense } from 'react';
import SurveyForm from './CreateOpinions';


export default function OpinionFormPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <SurveyForm />
    </Suspense>
  );
}
