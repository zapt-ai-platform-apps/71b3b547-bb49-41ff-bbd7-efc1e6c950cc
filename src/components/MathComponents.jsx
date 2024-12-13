import { Show } from 'solid-js';

export function ProblemDisplay(props) {
  return (
    <div class="bg-white p-4 rounded shadow w-full max-w-md mb-4">
      <p class="text-xl">{props.problem()}</p>
    </div>
  );
}

export function AnswerInput(props) {
  return (
    <Show when={!props.isCorrect()} fallback={null}>
      <div class="w-full max-w-md mb-4">
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Your Answer"
          value={props.answer()}
          onInput={(e) => props.setAnswer(e.target.value)}
        />
        <button
          class={`w-full p-2 ${
            props.loading() ? 'bg-gray-400' : 'bg-blue-500'
          } text-white font-bold rounded hover:bg-blue-700 cursor-pointer`}
          onClick={props.onSubmit}
          disabled={props.loading()}
        >
          {props.loading() ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </Show>
  );
}

export function Feedback(props) {
  return (
    <Show when={props.feedback()}>
      <div
        class={`w-full max-w-md p-2 mb-4 ${
          props.isCorrect() ? 'text-green-600' : 'text-red-600'
        }`}
      >
        <p>{props.feedback()}</p>
      </div>
      <Show when={props.isCorrect()}>
        <button
          class="w-full max-w-md p-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 cursor-pointer mb-2"
          onClick={props.onNextProblem}
        >
          Next Problem
        </button>
      </Show>
      <Show when={!props.isCorrect()}>
        <button
          class="w-full max-w-md p-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-700 cursor-pointer mb-2"
          onClick={props.onTryAgain}
        >
          Try Again
        </button>
      </Show>
    </Show>
  );
}

export function ProblemInput(props) {
  return (
    <div class="w-full max-w-md mb-4">
      <textarea
        class="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Enter your custom problem"
        value={props.customProblem()}
        onInput={(e) => props.setCustomProblem(e.target.value)}
      />
      <button
        class={`w-full p-2 ${
          props.loading() ? 'bg-gray-400' : 'bg-purple-500'
        } text-white font-bold rounded hover:bg-purple-700 cursor-pointer`}
        onClick={props.onSetProblem}
        disabled={props.loading()}
      >
        {props.loading() ? 'Setting...' : 'Set Problem'}
      </button>
    </div>
  );
}