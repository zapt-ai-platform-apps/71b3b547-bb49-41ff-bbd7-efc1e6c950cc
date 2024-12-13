import { createSignal, onMount } from 'solid-js';
import { fetchProblem, handleSetCustomProblem, handleNextProblem } from './problemHandlers';
import { handleSubmit, handleTryAgain } from './answerHandlers';

function useMathProblem() {
  const [problem, setProblem] = createSignal('');
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [generatingProblem, setGeneratingProblem] = createSignal(false);
  const [useCustomProblem, setUseCustomProblem] = createSignal(false);
  const [customProblem, setCustomProblem] = createSignal('');

  const fetchProblemHandler = async () => {
    await fetchProblem(setGeneratingProblem, setProblem, setAnswer, setFeedback, setIsCorrect);
  };

  const handleSetCustomProblemHandler = (e) => {
    handleSetCustomProblem(e, customProblem, setProblem, setAnswer, setFeedback, setIsCorrect);
  };

  const handleNextProblemHandler = () => {
    handleNextProblem(useCustomProblem, setProblem, setCustomProblem, setUseCustomProblem, fetchProblemHandler);
  };

  onMount(() => {
    fetchProblemHandler();
  });

  const handleSubmitHandler = async (e) => {
    await handleSubmit(e, answer, problem, setLoading, setIsCorrect, setFeedback);
  };

  const handleTryAgainHandler = () => {
    handleTryAgain(setAnswer, setFeedback);
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
    fetchProblem: fetchProblemHandler,
    handleSubmit: handleSubmitHandler,
    handleTryAgain: handleTryAgainHandler,
    handleNextProblem: handleNextProblemHandler,
    useCustomProblem,
    setUseCustomProblem,
    customProblem,
    setCustomProblem,
    handleSetCustomProblem: handleSetCustomProblemHandler,
  };
}

export default useMathProblem;