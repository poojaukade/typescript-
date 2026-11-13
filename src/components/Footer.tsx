
type FooterProps = {
  totalTasks: number;
  remainingTasks: number;
};

function Footer({ totalTasks, remainingTasks }: FooterProps) {
  return (
    <footer className="footer">
      <p>
        You have completed {totalTasks - remainingTasks} out of{" "}
        {totalTasks} tasks.
      </p>
    </footer>
  );
}

export default Footer;
