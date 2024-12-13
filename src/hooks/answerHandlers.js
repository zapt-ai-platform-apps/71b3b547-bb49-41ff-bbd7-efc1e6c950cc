import { createEvent } from '../supabaseClient';

export const handleSubmit = async (
  e,
  answer,
  problem,
  setLoading,
  setIsCorrect,
  setFeedback,
  setHint
) => {
  e.preventDefault();
  if (!answer().trim()) return;
  setLoading(true);

  try {
    console.log('Checking answer...');
    const checkResult = await createEvent('chatgpt_request', {
      prompt: `A student provided the answer "${answer()}" to the problem "${problem()}". Determine if the answer is correct. Respond with a JSON object in the following format: {"is_correct": true/false, "feedback": "Provide feedback on the student's answer.", "hint": "Provide a helpful hint to guide the student if their answer is incorrect."}. If the answer is correct, "hint" can be an empty string.`,
      response_type: 'json',
    });
    console.log('Check result:', checkResult);
    setIsCorrect(checkResult.is_correct);
    setFeedback(checkResult.feedback);
    setHint(checkResult.hint || '');
  } catch (error) {
    console.error('Error checking answer:', error);
    setFeedback('Error checking answer. Please try again.');
    setHint('');
  }
  setLoading(false);
};

export const handleTryAgain = (setAnswer, setFeedback, setHint) => {
  setAnswer('');
  setFeedback('');
  setHint('');
};