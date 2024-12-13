import { createEvent } from '../supabaseClient';

export const fetchProblem = async (
  setGeneratingProblem,
  setProblem,
  setAnswer,
  setFeedback,
  setIsCorrect
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
  setGeneratingProblem
) => {
  e.preventDefault();
  if (!customProblem().trim()) return;
  setGeneratingProblem(true);
  setProblem(customProblem().trim());
  setAnswer('');
  setFeedback('');
  setIsCorrect(false);
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
    fetchProblem();
  } else {
    fetchProblem();
  }
};