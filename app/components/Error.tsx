interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({ message = "エラーが発生しました", onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="text-red-400 text-4xl mb-4">⚠️</div>
      <p className="text-white text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-colors font-semibold"
        >
          再試行
        </button>
      )}
    </div>
  );
}
