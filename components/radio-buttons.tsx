interface CustomRadioButtons {
  name: string;
  value: string;
  defaultValue: string;
}

import { useTestStore } from "@/providers/test-store-provider";

export function CustomRadioButtons({
  name,
  value,
  defaultValue,
}: CustomRadioButtons) {
  const { setMode, setDifficulty, startTest } = useTestStore((state) => state);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "mode") {
      setMode(e.target.value);
    } else if (name === "difficulty") {
      setDifficulty(e.target.value);
    }
  };
  return (
    <label
      htmlFor={value}
      className="has-checked:text-blue-400 has-checked:border-blue-400 border border-neutral-400 py-1.5 px-2.5 rounded-lg cursor-pointer hover:text-blue-400/80 hover:border-blue-400/80"
    >
      {value}
      <input
        type="radio"
        className="sr-only"
        id={value}
        value={value}
        name={name}
        defaultChecked={defaultValue === value}
        onChange={handleChange}
        disabled={startTest}
      />
    </label>
  );
}
