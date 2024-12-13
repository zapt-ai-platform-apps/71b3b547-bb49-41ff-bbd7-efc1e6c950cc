function ProblemDisplay(props) {
  return (
    <div class="bg-white p-6 rounded shadow-md mb-4 w-full max-w-md">
      <p class="text-2xl font-bold text-center">{props.problem()}</p>
    </div>
  );
}

export default ProblemDisplay;