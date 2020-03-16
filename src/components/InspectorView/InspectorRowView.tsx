import * as React from 'react';
import './InspectorRowView.scss';

interface InspectorRowViewProps {
  label?: string;
}

export const InspectorRowView: React.FC<InspectorRowViewProps> = props => {
  return (
    <div className="inspector-row">
      <div className="inspector-row__label">{props.label}</div>
      <div className="inspector-row__input">{props.children}</div>
    </div>
  );
};
