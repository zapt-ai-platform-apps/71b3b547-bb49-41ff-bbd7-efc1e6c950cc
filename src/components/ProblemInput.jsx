function ProblemInput(props) {
  return (
    <form onSubmit={props.onSetProblem} class="mb-4 w-full max-w-md">
      <input
        type="text"
        value={props.customProblem()}
        onInput={(e) => props.setCustomProblem(e.target.value)}
        class="w-full p-3 rounded border box-border mb-2"
        placeholder="Your Problem (e.g., 2 + 2)"
        required
      />
      <input
        type="number"
        value={props.customAnswer()}
        onInput={(e) => props.setCustomAnswer(e.target.value)}
        class="w-full p-3 rounded border box-border mb-2"
        placeholder="Correct Answer"
        required
      />
      <button
        type="submit"
        class="w-full mt-2 p-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 cursor-pointer"
      >
        Set Problem
      </button>
    </form>
  );
}

export default ProblemInput;