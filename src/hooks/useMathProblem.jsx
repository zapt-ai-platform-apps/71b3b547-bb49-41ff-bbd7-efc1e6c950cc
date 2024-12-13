import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';

function useMathProblem() {
  const [problem, setProblem] = createSignal('');
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [generatingProblem, setGeneratingProblem] = createSignal(false);

  const fetchProblem = async () => {
    setGeneratingProblem(true);
    try {
      console.log('Generating new problem...');
      const generatedProblem = await createEvent('chatgpt_request', {
        prompt: 'Generate a single math problem suitable for a student, and provide only the problem statement.',
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

  onMount(() => {
    fetchProblem();
  });

  const handleSubmit = async (e) => {
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

  const handleTryAgain = () => {
    setAnswer('');
    setFeedback('');
  };

  const handleNextProblem = () => {
    fetchProblem();
  };

  return {
    problem,
    setProblem,
    answer,
    setAnswer,
    feedback,
    setFeedback,
    isCorrect,
    setIsCorrect,
    loading,
    setLoading,
    generatingProblem,
    setGeneratingProblem,
    fetchProblem,
    handleSubmit,
    handleTryAgain,
    handleNextProblem,
  };
}

export default useMathProblem;