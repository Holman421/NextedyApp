import './TextInput.css';

type TextInputProps = {
  text: string;
  setText: (text: string) => void;
};

export default function TextInput({ text, setText }: TextInputProps) {
  return (
    <div className="text-input-container">
      <label htmlFor="stock-symbol-input" className="text-input-label">
        Enter a stock symbol:
      </label>
      <input
        id="stock-symbol-input"
        className="text-input"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
