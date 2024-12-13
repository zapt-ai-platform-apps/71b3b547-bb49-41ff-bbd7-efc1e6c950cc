import { createSignal } from 'solid-js';

function useMathProblem() {
  const [problem, setProblem] = createSignal('');
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [generatingProblem, setGeneratingProblem] = createSignal(false);
  const [useCustomProblem, setUseCustomProblem] = createSignal(false);
  const [customProblem, setCustomProblem] = createSignal('');

  const fetchProblem = async () => {
    setGeneratingProblem(true);
    // Simulate API call to fetch a problem
    setTimeout(() => {
      setProblem('What is 7 + 5?');
      setGeneratingProblem(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate answer checking
    setTimeout(() => {
      const correctAnswer = eval(problem().replace(/[^\d+\-*/().]/g, ''));
      if (parseFloat(answer()) === correctAnswer) {
        setFeedback('Correct!');
        setIsCorrect(true);
      } else {
        setFeedback('Incorrect, please try again.');
        setIsCorrect(false);
      }
      setLoading(false);
    }, 1000);
  };

  const handleTryAgain = () => {
    setAnswer('');
    setFeedback('');
    setIsCorrect(null);
  };

  const handleNextProblem = () => {
    handleTryAgain();
    fetchProblem();
  };

  const handleSetCustomProblem = () => {
    setProblem(customProblem());
    setCustomProblem('');
    setUseCustomProblem(false);
  };

  // Fetch initial problem
  if (!problem() && !useCustomProblem()) {
    fetchProblem();
  }

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
    useCustomProblem,
    setUseCustomProblem,
    customProblem,
    setCustomProblem,
    handleSetCustomProblem,
  };
}

export default useMathProblem;