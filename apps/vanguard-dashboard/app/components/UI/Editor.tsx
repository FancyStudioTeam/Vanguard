import { yaml } from '@codemirror/lang-yaml';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';

export function Editor() {
	return (
		<CodeMirror
			extensions={[
				githubDark,
				yaml(),
			]}
			height='200px'
		/>
	);
}
