const ErrorState = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <p className="text-red-500 text-lg">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;