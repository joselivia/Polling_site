import React, { Suspense } from 'react';
import CreateQuiz from './CreateQuestions';


export default function CreateQuizePage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreateQuiz />
    </Suspense>
  );
}
