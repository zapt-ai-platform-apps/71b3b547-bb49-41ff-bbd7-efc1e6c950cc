import { createSignal, onMount } from 'solid-js';
import ProblemDisplay from './components/ProblemDisplay';
import AnswerInput from './components/AnswerInput';
import Feedback from './components/Feedback';
import { createEvent } from './supabaseClient';

function App() {
  const [problem, setProblem] = createSignal('');
  const [correctAnswer, setCorrectAnswer] = createSignal(null);
  const [answer, setAnswer] = createSignal('');
  const [feedback, setFeedback] = createSignal('');
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const generateProblem = () => {
    const operations = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let problemStr = `${num1} ${operation} ${num2}`;
    let result = eval(problemStr);

    // Round result if division
    if (operation === '/') {
      result = parseFloat(result.toFixed(2));
    } else {
      result = parseFloat(result.toFixed(2));
    }

    setProblem(problemStr);
    setCorrectAnswer(result);
    setAnswer('');
    setFeedback('');
    setIsCorrect(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userAnswer = parseFloat(answer());
    if (userAnswer === correctAnswer()) {
      setIsCorrect(true);
      setFeedback('Correct! Well done!');
    } else {
      // Generate hint using createEvent
      try {
        const hint = await createEvent('chatgpt_request', {
          prompt: `A student got the answer ${userAnswer} for the problem ${problem()}. Provide a helpful hint to guide them to the correct answer.`,
          response_type: 'text'
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

  const handleNextProblem = () => {
    generateProblem();
  };

  onMount(() => {
    generateProblem();
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Maths Homework Marker</h1>
      <ProblemDisplay problem={problem} />
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
        onNextProblem={handleNextProblem}
      />
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