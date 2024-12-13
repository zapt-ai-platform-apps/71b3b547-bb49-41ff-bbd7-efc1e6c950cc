function Feedback(props) {
  return (
    <div class="mb-4 w-full max-w-md text-center">
      {props.feedback() && (
        <div
          class={`p-4 rounded ${
            props.isCorrect()
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          <p>{props.feedback()}</p>
        </div>
      )}
      {!props.isCorrect() && props.feedback() && (
        <button
          onClick={props.onTryAgain}
          class="mt-2 p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
        >
          Try Again
        </button>
      )}
      {props.isCorrect() && (
        <button
          onClick={props.onResetProblem}
          class="mt-2 p-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Set New Problem
        </button>
      )}
    </div>
  );
}

export default Feedback;