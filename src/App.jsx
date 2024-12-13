import { createSignal, Show } from 'solid-js';
import ProblemInput from './components/ProblemInput';
import ProblemDisplay from './components/ProblemDisplay';
import AnswerInput from './components/AnswerInput';
import Feedback from './components/Feedback';
import { createEvent } from './supabaseClient';

function App() {
  const [customProblem, setCustomProblem] = createSignal('');
  const [customAnswer, setCustomAnswer] = createSignal('');
  const [isProblemSet, setIsProblemSet] = createSignal(false);
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const handleSetProblem = (e) => {
    e.preventDefault();
    if (customProblem().trim() && customAnswer().trim()) {
      setIsProblemSet(true);
      setAnswer('');
      setFeedback('');
      setIsCorrect(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userAnswer = parseFloat(answer());
    const correctAnswer = parseFloat(customAnswer());

    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      setFeedback('Correct! Well done!');
    } else {
      try {
        const hint = await createEvent('chatgpt_request', {
          prompt: `A student got the answer ${userAnswer} for the problem "${customProblem()}". Provide a helpful hint to guide them to the correct answer.`,
          response_type: 'text',
        });
        setFeedback(hint);
      } catch (error) {
        console.error('Error generating hint:', error);
        setFeedback('Incorrect. Please try again.');
      }
      setIsCorrect(false);
    }
    setLoading(false);
  };

  const handleTryAgain = () => {
    setAnswer('');
    setFeedback('');
  };

  const handleResetProblem = () => {
    setCustomProblem('');
    setCustomAnswer('');
    setIsProblemSet(false);
    setAnswer('');
    setFeedback('');
    setIsCorrect(false);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center text-gray-800">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Maths Homework Marker</h1>
      <Show when={!isProblemSet()}>
        <ProblemInput
          customProblem={customProblem}
          setCustomProblem={setCustomProblem}
          customAnswer={customAnswer}
          setCustomAnswer={setCustomAnswer}
          onSetProblem={handleSetProblem}
        />
      </Show>
      <Show when={isProblemSet()}>
        <ProblemDisplay problem={customProblem} />
        <AnswerInput
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <Feedback
          feedback={feedback}
          isCorrect={isCorrect}
          onTryAgain={handleTryAgain}
          onResetProblem={handleResetProblem}
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