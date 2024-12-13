import { createEvent } from '../supabaseClient';

export const fetchProblem = async (
  setGeneratingProblem,
  setProblem,
  setAnswer,
  setFeedback,
  setIsCorrect,
  setHint
) => {
  setGeneratingProblem(true);
  try {
    console.log('Generating new problem...');
    const generatedProblem = await createEvent('chatgpt_request', {
      prompt:
        'Generate a single math problem suitable for a student, and provide only the problem statement.',
      response_type: 'text',
    });
    setProblem(generatedProblem.trim());
    setAnswer('');
    setFeedback('');
    setIsCorrect(false);
    setHint('');
    console.log('Problem generated:', generatedProblem);
  } catch (error) {
    console.error('Error generating problem:', error);
    setFeedback('Error generating problem. Please try again.');
  }
  setGeneratingProblem(false);
};

export const handleSetCustomProblem = (
  e,
  customProblem,
  setProblem,
  setAnswer,
  setFeedback,
  setIsCorrect,
  setGeneratingProblem,
  setHint
) => {
  e.preventDefault();
  if (!customProblem().trim()) return;
  setGeneratingProblem(true);
  setProblem(customProblem().trim());
  setAnswer('');
  setFeedback('');
  setIsCorrect(false);
  setHint('');
  setGeneratingProblem(false);
};

export const handleNextProblem = (
  useCustomProblem,
  setProblem,
  setCustomProblem,
  setUseCustomProblem,
  fetchProblem
) => {
  if (useCustomProblem()) {
    setProblem('');
    setCustomProblem('');
    setUseCustomProblem(false);
    fetchProblem();
  } else {
    fetchProblem();
  }
};