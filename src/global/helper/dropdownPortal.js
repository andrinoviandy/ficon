import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const DropdownPortal = ({
  isOpen,
  anchorRef,
  children,
  onClose,
  placement = "bottom-start",
}) => {
  const [style, setStyle] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !anchorRef) return;

    const rect = anchorRef.getBoundingClientRect();
    const gap = 8;

    const dropdownWidth =
      dropdownRef.current?.offsetWidth || 224;

    let top = rect.bottom + window.scrollY + gap;
    let left = rect.left + window.scrollX;

    // ✅ RIGHT ALIGN
    if (placement === "bottom-end") {
      left = rect.right + window.scrollX - dropdownWidth;
    }

    setStyle({
      position: "absolute",
      top,
      left,
      zIndex: 9999,
    });
  }, [isOpen, anchorRef, placement]);

  // ✅ klik luar = close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        anchorRef &&
        !anchorRef.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, [isOpen, anchorRef, onClose]);

  // ✅ scroll = close
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => onClose();
    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRef) return null;

  return createPortal(
    <div ref={dropdownRef} style={style}>
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;