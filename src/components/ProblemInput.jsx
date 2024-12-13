function ProblemInput(props) {
  return (
    <form onSubmit={props.onSetProblem} class="mb-4 w-full max-w-md">
      <textarea
        value={props.customProblem()}
        onInput={(e) => props.setCustomProblem(e.target.value)}
        class="w-full p-3 rounded border box-border h-32"
        placeholder="Enter your math problem here..."
        required
      />
      <button
        type="submit"
        disabled={props.loading()}
        class={`w-full mt-2 p-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 cursor-pointer ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {props.loading() ? 'Setting Problem...' : 'Set Problem'}
      </button>
    </form>
  );
}

export default ProblemInput;