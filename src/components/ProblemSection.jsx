import { ProblemDisplay, AnswerInput, Feedback } from './MathComponents';

function ProblemSection(props) {
  const {
    problem,
    answer,
    setAnswer,
    feedback,
    hint,
    isCorrect,
    loading,
    handleSubmit,
    handleTryAgain,
    handleNextProblem,
  } = props;

  return (
    <>
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
        hint={hint}
        isCorrect={isCorrect}
        onTryAgain={handleTryAgain}
        onNextProblem={handleNextProblem}
      />
    </>
  );
}

export default ProblemSection;