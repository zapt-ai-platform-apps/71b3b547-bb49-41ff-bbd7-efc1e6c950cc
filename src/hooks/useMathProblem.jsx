import { createSignal, onMount, createEffect } from 'solid-js';
import {
  fetchProblemHandler,
  handleSetCustomProblemHandler,
  handleNextProblemHandler,
} from './problemHandlers';
import { handleSubmitHandler, handleTryAgainHandler } from './answerHandlers';

function useMathProblem() {
  const [problem, setProblem] = createSignal('');
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [hint, setHint] = createSignal('');
  const [solution, setSolution] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [generatingProblem, setGeneratingProblem] = createSignal(false);
  const [useCustomProblem, setUseCustomProblem] = createSignal(false);
  const [customProblem, setCustomProblem] = createSignal('');

  const fetchProblem = async () => {
    await fetchProblemHandler(
      setGeneratingProblem,
      setProblem,
      setAnswer,
      setFeedback,
      setIsCorrect,
      setHint,
      setSolution
    );
  };

  const handleSetCustomProblem = (e) => {
    handleSetCustomProblemHandler(
      e,
      customProblem,
      setProblem,
      setAnswer,
      setFeedback,
      setIsCorrect,
      setGeneratingProblem,
      setHint,
      setSolution
    );
  };

  const handleNextProblem = () => {
    handleNextProblemHandler(
      useCustomProblem,
      setProblem,
      setCustomProblem,
      setUseCustomProblem,
      fetchProblem
    );
    setHint('');
    setSolution('');
  };

  onMount(() => {
    if (!useCustomProblem()) {
      fetchProblem();
    }
  });

  createEffect(() => {
    if (!useCustomProblem() && !problem()) {
      fetchProblem();
    }
  });

  const handleSubmit = async (e) => {
    await handleSubmitHandler(
      e,
      answer,
      problem,
      setLoading,
      setIsCorrect,
      setFeedback,
      setHint,
      setSolution
    );
  };

  const handleTryAgain = () => {
    handleTryAgainHandler(setAnswer, setFeedback, setHint, setSolution);
  };

  return {
    problem,
    setProblem,
    answer,
    setAnswer,
    feedback,
    setFeedback,
    hint,
    setHint,
    solution,
    setSolution,
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