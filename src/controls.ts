import * as readline from 'readline';

export function renderCallback(
  addMessage: (message: string) => void,
): void {
  let message = '';
  process.stdin.on('keypress', (str: string, key: readline.Key) => {
    if (key.name === 'return') {
      addMessage(message);
      console.log(`\n>> ${message}`);
      message = '';
    } else if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
      process.exit();
    } else if (key.name === 'backspace' && message.length) {
      message = message.substring(0, message.length - 1);
    } else if (str) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      message += str;
      process.stdout.write(message);
    }
  });
}

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
