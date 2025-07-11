export function getMouseMove(event: MouseEvent | TouchEvent) {
  let mouseX;
  let mouseY;

  if (event instanceof TouchEvent) {
    const touch = event.touches[0]; // Get the first touch point
    const targetRect =
      (event.currentTarget as HTMLElement)!.getBoundingClientRect();
    mouseX = touch.clientX - targetRect.x;
    mouseY = touch.clientY - targetRect.y;
  } else {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  }
  return { mouseX, mouseY };
}
