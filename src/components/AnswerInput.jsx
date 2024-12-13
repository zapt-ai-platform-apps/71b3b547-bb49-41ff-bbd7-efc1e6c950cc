function AnswerInput(props) {
  return (
    <form onSubmit={props.onSubmit} class="mb-4 w-full max-w-md">
      <input
        type="number"
        value={props.answer()}
        onInput={(e) => props.setAnswer(e.target.value)}
        class="w-full p-3 rounded border box-border"
        placeholder="Your Answer"
        required
      />
      <button
        type="submit"
        disabled={props.loading()}
        class={`w-full mt-2 p-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 cursor-pointer ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {props.loading() ? 'Checking...' : 'Submit Answer'}
      </button>
    </form>
  );
}

export default AnswerInput;