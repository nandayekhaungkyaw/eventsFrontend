const Pagination = ({ links, onPageChange }) => {
  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="Page navigation example" className="mt-6 flex justify-end">
      <ul className="inline-flex -space-x-px text-base h-10">
        {links.map((link, index) => {
          const label = link.label
            .replace(/&laquo;/g, "«")
            .replace(/&raquo;/g, "»")
            .replace(/<\/?[^>]+(>|$)/g, "");

          const isActive = link.active;
          const isDisabled = !link.url;

          let baseClasses =
            "flex items-center justify-center px-4 h-10 leading-tight border ";
          let styleClasses = "";

          if (isActive) {
            styleClasses =
              "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
          } else {
            styleClasses =
              "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
          }

          // First and last items rounded corners
          if (index === 0) {
            styleClasses += " rounded-s-lg";
          }
          if (index === links.length - 1) {
            styleClasses += " rounded-e-lg";
          }

          return (
            <li key={index}>
              <button
                className={`${baseClasses} ${styleClasses} ${
                  isDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => !isDisabled && onPageChange(link.url)}
                disabled={isDisabled}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
