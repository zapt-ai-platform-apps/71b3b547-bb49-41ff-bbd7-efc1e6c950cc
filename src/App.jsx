import { Show } from 'solid-js';
import ProblemModeSwitcher from './components/ProblemModeSwitcher';
import useMathProblem from './hooks/useMathProblem';
import ProblemInput from './components/ProblemInput';
import ProblemSection from './components/ProblemSection';

function App() {
  const {
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
  } = useMathProblem();

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center text-gray-800">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Maths Homework Marker</h1>

      <ProblemModeSwitcher
        useCustomProblem={useCustomProblem}
        setUseCustomProblem={setUseCustomProblem}
      />

      <Show when={useCustomProblem()}>
        <ProblemInput
          customProblem={customProblem}
          setCustomProblem={setCustomProblem}
          onSetProblem={handleSetCustomProblem}
          loading={loading}
        />
      </Show>

      <Show
        when={!generatingProblem() && problem()}
        fallback={<p class="text-xl mb-4">Generating problem...</p>}
      >
        <ProblemSection
          problem={problem}
          answer={answer}
          setAnswer={setAnswer}
          feedback={feedback}
          hint={hint}
          solution={solution}
          isCorrect={isCorrect}
          loading={loading}
          handleSubmit={handleSubmit}
          handleTryAgain={handleTryAgain}
          handleNextProblem={handleNextProblem}
        />
      </Show>

      <div class="mt-12 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default App;