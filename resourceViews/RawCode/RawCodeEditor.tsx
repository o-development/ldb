import React, { FunctionComponent, useRef } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { useThemeChange } from '../../components/ThemeProvider';

interface RawCodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const RawCodeEditor: FunctionComponent<RawCodeEditorProps> = ({
  value,
  onChange,
}) => {
  const monacoRef = useRef<Monaco>(null);
  const { colorScheme } = useThemeChange();

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
  };

  return (
    <Editor
      className="flex-1"
      defaultLanguage="turtle"
      theme={colorScheme === 'light' ? 'light' : 'hc-black'}
      value={value}
      onChange={onChange}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
