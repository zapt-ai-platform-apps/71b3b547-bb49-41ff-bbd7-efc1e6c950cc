function AnswerInput(props) {
  return (
    <form onSubmit={props.onSubmit} class="mb-4 w-full max-w-md">
      <input
        type="number"
        value={props.answer()}
        onInput={(e) => props.setAnswer(e.target.value)}
        class="w-full p-3 rounded border"
        placeholder="Your Answer"
        required
      />
      <button
        type="submit"
        disabled={props.loading()}
        class="w-full mt-2 p-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700"
      >
        {props.loading() ? 'Checking...' : 'Submit'}
      </button>
    </form>
  );
}

export default AnswerInput;