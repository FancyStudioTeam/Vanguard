import { yaml } from '@codemirror/lang-yaml';
import { githubDark } from '@uiw/codemirror-theme-github';
import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror, { type BasicSetupOptions } from '@uiw/react-codemirror';

const CodeMirrorBasicSetup: BasicSetupOptions = {
	bracketMatching: true,
	indentOnInput: true,
	lineNumbers: true,
	tabSize: 2,
};
const CodeMirrorTheme = createTheme({
	settings: {
		background: '#171717',
		caret: '#f43f5e',
		fontFamily: 'JetBrains Mono',
		fontSize: 16,
		foreground: '#a3a3a3',
		gutterBackground: '#171717',
		gutterBorder: 'transparent',
		gutterForeground: '#a3a3a3',
		lineHighlight: '#262626',
	},
	styles: [],
	theme: 'dark',
});

export function Editor({ code, onChange }: EditorProps) {
	return (
		<CodeMirror
			basicSetup={CodeMirrorBasicSetup}
			extensions={[
				yaml(),
				githubDark,
			]}
			height='auto'
			minHeight='250px'
			minWidth='100%'
			onChange={onChange}
			theme={CodeMirrorTheme}
			value={code}
		/>
	);
}

export interface EditorProps {
	code: string;
	onChange: (value: string) => void;
}
