import { copyToClipboard } from "./clipboard";

/**
 * Universal Share Utility
 * Tries Web Share API on mobile devices first; falls back to copying URL.
 */
export async function shareContent({ title, text, url }) {
  const targetUrl = url || window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: title || document.title,
        text: text || "",
        url: targetUrl,
      });
      return { success: true, method: "share", message: "साझा किया गया!" };
    } catch (error) {
      if (error.name === "AbortError") {
        return { success: false, method: "canceled", message: "रद्द किया गया" };
      }
      // If Web Share failed with other error, fall back to copy
    }
  }

  // Fallback: copy link
  const copied = await copyToClipboard(targetUrl);
  if (copied) {
    return {
      success: true,
      method: "clipboard",
      message: "वेबसाइट लिंक कॉपी कर लिया गया है!",
    };
  }

  return {
    success: false,
    method: "failed",
    message: "साझा करने में असमर्थ। कृपया लिंक सीधे कॉपी करें।",
  };
}
