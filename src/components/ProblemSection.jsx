import ProblemDisplay from './ProblemDisplay';
import AnswerInput from './AnswerInput';
import Feedback from './Feedback';

function ProblemSection(props) {
  const {
    problem,
    answer,
    setAnswer,
    feedback,
    hint,
    solution,
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
        solution={solution}
        isCorrect={isCorrect}
        onTryAgain={handleTryAgain}
        onNextProblem={handleNextProblem}
      />
    </>
  );
}

export default ProblemSection;