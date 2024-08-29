import "./LoadingMessage.css";

type LoadingMessageProps = {
  loading: boolean;
};

export default function LoadingMessage({ loading }: LoadingMessageProps) {
  if (!loading) {
    return null;
  }
  return <div className="loader">Loading...</div>;
}
