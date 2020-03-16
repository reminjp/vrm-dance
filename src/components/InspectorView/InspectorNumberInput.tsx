import * as React from 'react';
import './InspectorNumberInput.scss';

interface InspectorNumberInputProps {
  value: number;
  onChange(value: number): void;
}

export const InspectorNumberInput: React.FC<InspectorNumberInputProps> = props => {
  const [temporaryValue, setTemporaryValue] = React.useState(
    String(props.value)
  );

  React.useEffect(() => setTemporaryValue(String(props.value)), [
    props.value,
    setTemporaryValue,
  ]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      props.onChange(Number(temporaryValue) || 0);
    },
    [props.onChange, temporaryValue]
  );

  const onBlur = React.useCallback(() => {
    props.onChange(Number(temporaryValue) || 0);
  }, [props.onChange, temporaryValue]);

  return (
    <form className="inspector-number-input" onSubmit={onSubmit}>
      <input
        type=""
        className="inspector-number-input__input"
        value={temporaryValue}
        onChange={e => setTemporaryValue(e.target.value)}
        onBlur={onBlur}
      />
    </form>
  );
};
