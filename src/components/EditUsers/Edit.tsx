import { useState } from "react";

interface initialValue {
  text: string;
  name: string;
  handle_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Edit({ text, handle_change, name }: initialValue) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={text}
      name={name}
      onChange={handle_change}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsEditing(false)}
    />
  ) : (
    <p onDoubleClick={handleDoubleClick}>{text}</p>
  );
}
