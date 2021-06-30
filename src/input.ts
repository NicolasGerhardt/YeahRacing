import { canvas } from './graphics';
import { Keys } from './keys';

let MousePos: any = { x: 0, y: 0 };
let LastKeyPressed = '';

function SetUpKeyBinds() {
  window.addEventListener('keydown', function (evt: KeyboardEvent) {
    setupKeyEvent(evt, Keys.Up_Arrow, true);
    setupKeyEvent(evt, Keys.Down_Arrow, true);
    setupKeyEvent(evt, Keys.Left_Arrow, true);
    setupKeyEvent(evt, Keys.Right_Arrow, true);
    setupKeyEvent(evt, Keys.w, true);
    setupKeyEvent(evt, Keys.a, true);
    setupKeyEvent(evt, Keys.s, true);
    setupKeyEvent(evt, Keys.d, true);
  });
  window.addEventListener('keyup', function (evt: KeyboardEvent) {
    setupKeyEvent(evt, Keys.Up_Arrow, false);
    setupKeyEvent(evt, Keys.Down_Arrow, false);
    setupKeyEvent(evt, Keys.Left_Arrow, false);
    setupKeyEvent(evt, Keys.Right_Arrow, false);
    setupKeyEvent(evt, Keys.w, false);
    setupKeyEvent(evt, Keys.a, false);
    setupKeyEvent(evt, Keys.s, false);
    setupKeyEvent(evt, Keys.d, false);
  });
}

function setupKeyEvent(evt: KeyboardEvent, key: any, isPressed: boolean) {
  if (evt.key.toLowerCase() == key.code.toLowerCase()) {
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

export { LastKeyPressed, MousePos, SetUpKeyBinds, Keys };
