import { createEvent } from '../supabaseClient';

export const handleSubmit = async (
  e,
  answer,
  problem,
  setLoading,
  setIsCorrect,
  setFeedback
) => {
  e.preventDefault();
  if (!answer().trim()) return;
  setLoading(true);

  try {
    console.log('Checking answer...');
    const checkResult = await createEvent('chatgpt_request', {
      prompt: `A student provided the answer "${answer()}" to the problem "${problem()}". Determine if the answer is correct. Respond with a JSON object in the following format: {"is_correct": true/false, "feedback": "Your feedback here."}`,
      response_type: 'json',
    });
    console.log('Check result:', checkResult);
    setIsCorrect(checkResult.is_correct);
    setFeedback(checkResult.feedback);
  } catch (error) {
    console.error('Error checking answer:', error);
    setFeedback('Error checking answer. Please try again.');
  }
  setLoading(false);
};

export const handleTryAgain = (setAnswer, setFeedback) => {
  setAnswer('');
  setFeedback('');
};