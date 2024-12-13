import { Show } from 'solid-js';
import {
  ProblemDisplay,
  AnswerInput,
  Feedback,
  ProblemInput,
} from './components/MathComponents';
import useMathProblem from './hooks/useMathProblem';

function App() {
  const {
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
  } = useMathProblem();

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center text-gray-800">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Maths Homework Marker</h1>

      <div class="w-full max-w-md mb-4">
        <button
          class={`w-1/2 p-2 ${
            !useCustomProblem()
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border border-purple-600'
          } font-bold rounded-l hover:bg-purple-700 cursor-pointer`}
          onClick={() => setUseCustomProblem(false)}
        >
          Generated Problem
        </button>
        <button
          class={`w-1/2 p-2 ${
            useCustomProblem()
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border border-purple-600'
          } font-bold rounded-r hover:bg-purple-700 cursor-pointer`}
          onClick={() => setUseCustomProblem(true)}
        >
          Enter Your Problem
        </button>
      </div>

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
        <ProblemDisplay problem={problem} />
        <AnswerInput
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleSubmit}
          loading={loading}
          isCorrect={isCorrect}
        />
        <Feedback
          feedback={feedback}
          isCorrect={isCorrect}
          onTryAgain={handleTryAgain}
          onNextProblem={handleNextProblem}
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