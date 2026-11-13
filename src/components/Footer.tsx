type FooterProps = {
  totalTasks: number;
  remainingTasks: number;
};

function Footer({ totalTasks, remainingTasks }: FooterProps) {
  return (
    <footer className="mt-6 border-t border-gray-300 px-4 py-4 text-center">
      <p className="text-sm text-gray-600">
        You have completed{" "}
        <span className="font-semibold text-green-600">
          {totalTasks - remainingTasks}
        </span>{" "}
        out of{" "}
        <span className="font-semibold text-gray-900">
          {totalTasks}
        </span>{" "}
        tasks.
      </p>
    </footer>
  );
}

export default Footer;