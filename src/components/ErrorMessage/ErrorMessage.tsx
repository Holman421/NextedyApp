import "./ErrorMessage.css";

type ErrorMessageProps = {
  invalidSymbols: string[];
};

export default function ErrorMessage({ invalidSymbols }: ErrorMessageProps) {
  if (invalidSymbols.length === 0) {
    return null;
  }

  return (
    <div className="error">Invalid symbols: {invalidSymbols.join(", ")}</div>
  );
}
