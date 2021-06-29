import { canvas } from './graphics';

let MousePos: any = { x: 0, y: 0 };
let LastKeyPressed = '';

function SetUpKeyBinds() {
  window.addEventListener('keydown', function (evt: KeyboardEvent) {
    setupKeyEvent(evt, Keys.Up_Arrow, true);
    setupKeyEvent(evt, Keys.Down_Arrow, true);
    setupKeyEvent(evt, Keys.Left_Arrow, true);
    setupKeyEvent(evt, Keys.Right_Arrow, true);
    setupKeyEvent(evt, Keys.Control, true);
  });
  window.addEventListener('keyup', function (evt: KeyboardEvent) {
    setupKeyEvent(evt, Keys.Up_Arrow, false);
    setupKeyEvent(evt, Keys.Down_Arrow, false);
    setupKeyEvent(evt, Keys.Left_Arrow, false);
    setupKeyEvent(evt, Keys.Right_Arrow, false);
    setupKeyEvent(evt, Keys.Control, false);
  });
}

function setupKeyEvent(evt: KeyboardEvent, key: any, isPressed: boolean) {
  if (evt.key == key.code) {
    key.isPressed = isPressed;
  }
}

window.addEventListener('keydown', function (evt: KeyboardEvent) {
  LastKeyPressed = evt.key;
});

window.addEventListener('mousemove', calculateMousePos);

function calculateMousePos(evt: MouseEvent) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  MousePos.x = evt.clientX - rect.left - root.scrollLeft;
  MousePos.y = evt.clientY - rect.top - root.scrollTop;
}

const Keys = {
  Up_Arrow: {
    code: 'ArrowUp',
    isPressed: false,
  },
  Down_Arrow: {
    code: 'ArrowDown',
    isPressed: false,
  },
  Left_Arrow: {
    code: 'ArrowLeft',
    isPressed: false,
  },
  Right_Arrow: {
    code: 'ArrowRight',
    isPressed: false,
  },
  Control: {
    code: 'Control',
    isPressed: false,
  },
};

export { LastKeyPressed, MousePos, SetUpKeyBinds, Keys };
