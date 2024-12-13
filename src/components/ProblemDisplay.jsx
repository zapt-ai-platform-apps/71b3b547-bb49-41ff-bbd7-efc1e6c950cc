function ProblemDisplay(props) {
  return (
    <div class="w-full max-w-md mb-8">
      <h2 class="text-2xl font-semibold mb-4">Problem:</h2>
      <p class="text-gray-700">{props.problem()}</p>
    </div>
  );
}

export default ProblemDisplay;
