export async function fetchProblemHandler(
  setGeneratingProblem,
  setProblem,
  setAnswer,
  setFeedback,
  setIsCorrect,
  setHint,
  setSolution
) {
  setGeneratingProblem(true);
  try {
    // Simulate fetching a problem from an API or database
    const fetchedProblem = await new Promise((resolve) =>
      setTimeout(() => resolve('Solve for x: 2x + 3 = 7'), 1000)
    );
    setProblem(fetchedProblem);
    setAnswer('');
    setFeedback('');
    setIsCorrect(false);
    setHint('');
    setSolution('');
  } catch (error) {
    console.error('Error fetching problem:', error);
  } finally {
    setGeneratingProblem(false);
  }
}

export function handleSetCustomProblemHandler(
  e,
  customProblem,
  setProblem,
  setAnswer,
  setFeedback,
  setIsCorrect,
  setGeneratingProblem,
  setHint,
  setSolution
) {
  e.preventDefault();
  setGeneratingProblem(true);
  setProblem(customProblem());
  setAnswer('');
  setFeedback('');
  setIsCorrect(false);
  setHint('');
  setSolution('');
  setGeneratingProblem(false);
}

export function handleNextProblemHandler(
  useCustomProblem,
  setProblem,
  setCustomProblem,
  setUseCustomProblem,
  fetchProblem
) {
  if (useCustomProblem()) {
    setProblem('');
    setCustomProblem('');
    setUseCustomProblem(false);
  } else {
    fetchProblem();
  }
}