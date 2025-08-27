type StarRatingProps = {
  average: number;
  count: number;
};

export default function StarRating({ average, count }: StarRatingProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <svg
            key={rating}
            className={`
              h-5 w-5 flex-shrink-0
              ${average > rating ? 'text-mocha-mousse' : 'text-soft-grey dark:text-gray-600'}
            `}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.888 3.876 4.28 1.12c.727.19 1.018 1.05.493 1.543l-3.268 3.033 1.02 4.49c.16 1.107-.936 1.832-1.896 1.305L10 15.547l-3.92 2.37c-.96.527-2.056-.198-1.896-1.305l1.02-4.49-3.268-3.033c-.525-.493-.234-1.353.493-1.543l4.28-1.12 1.888-3.876z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <p className="ml-2 text-sm text-charcoal dark:text-soft-grey">
        {count} reviews
      </p>
    </div>
  );
}