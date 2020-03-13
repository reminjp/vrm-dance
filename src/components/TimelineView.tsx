import * as React from 'react';
import { VRMSchema } from '@pixiv/three-vrm';

export const TimelineView: React.FC = () => {
  return (
    <div>
      {Object.entries(VRMSchema.HumanoidBoneName).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};
