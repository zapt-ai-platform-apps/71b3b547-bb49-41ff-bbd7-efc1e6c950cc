function ProblemModeSwitcher(props) {
  const { useCustomProblem, setUseCustomProblem } = props;

  return (
    <div class="w-full max-w-md mb-4">
      <button
        class={`w-1/2 p-2 ${
          !useCustomProblem()
            ? 'bg-purple-600 text-white'
            : 'bg-white text-purple-600 border border-purple-600'
        } font-bold rounded-l hover:bg-purple-700 cursor-pointer`}
        onClick={() => setUseCustomProblem(false)}
      >
        Generated Problem
      </button>
      <button
        class={`w-1/2 p-2 ${
          useCustomProblem()
            ? 'bg-purple-600 text-white'
            : 'bg-white text-purple-600 border border-purple-600'
        } font-bold rounded-r hover:bg-purple-700 cursor-pointer`}
        onClick={() => setUseCustomProblem(true)}
      >
        Enter Your Problem
      </button>
    </div>
  );
}

export default ProblemModeSwitcher;