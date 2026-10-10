/**
 * Robust Clipboard Copy Utility
 * Supports modern navigator.clipboard with fallback for older mobile browsers
 */
export async function copyToClipboard(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to legacy execCommand
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Ensure element is not visible or disruptive
    textArea.style.position = "fixed";
    textArea.style.top = "-999999px";
    textArea.style.left = "-999999px";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}
