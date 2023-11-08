export default function handleTabKey(e: KeyboardEvent, modalRef: React.MutableRefObject<Element | undefined>) {
  const focusableElements: NodeListOf<Element> = modalRef.current!.querySelectorAll(
    "a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  // if TAB is pressed with SHIFT and the current focused/active element is the first focusable element in the modal, then shift the focus to the last focusable element.
  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement.focus();
    // else If TAB is pressed without SHIFT key and the current focused/active element is the last focusable element in the modal, then shift the focus to the first focusable element.
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement.focus();
  }
}
