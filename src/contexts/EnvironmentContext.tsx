import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';

export interface Environment {
  windowWidth: number;
  windowHeight: number;
}

export const EnvironmentContext = React.createContext<Environment>({
  windowWidth: 0,
  windowHeight: 0,
});

export function useEnvironment(): Environment {
  return React.useContext(EnvironmentContext);
}

export interface EnvironmentProviderProps {
  onRedirectCallback?(appState: any): void;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = props => {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);

  return (
    <EnvironmentContext.Provider
      value={{
        windowWidth,
        windowHeight,
      }}
    >
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width, height) => {
          setWindowWidth(width || 0);
          setWindowHeight(height || 0);
        }}
      />
      {props.children}
    </EnvironmentContext.Provider>
  );
};
