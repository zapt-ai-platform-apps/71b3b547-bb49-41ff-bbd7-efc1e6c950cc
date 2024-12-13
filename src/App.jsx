import { Show } from 'solid-js';
import ProblemDisplay from './components/ProblemDisplay';
import AnswerInput from './components/AnswerInput';
import Feedback from './components/Feedback';
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
  } = useMathProblem();

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center text-gray-800">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Maths Homework Marker</h1>

      <Show when={!generatingProblem()} fallback={<p class="text-xl mb-4">Generating problem...</p>}>
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