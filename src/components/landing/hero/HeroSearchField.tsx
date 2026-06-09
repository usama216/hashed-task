"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={cn("shrink-0 text-[#9ca3af] transition-transform duration-200", open && "rotate-180")}
      aria-hidden
    >
      <path
        d="M3.5 5.5L7 9 10.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
      <path
        d="M3 7.2l2.6 2.6L11 4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface HeroSearchOption {
  value: string;
  label: string;
}

interface HeroSearchFieldProps {
  label: string;
  value: string;
  options: HeroSearchOption[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
}

interface MenuPosition {
  top: number;
  left: number;
  width: number;
}

export function HeroSearchField({
  label,
  value,
  options,
  isOpen,
  onOpen,
  onClose,
  onChange,
}: HeroSearchFieldProps) {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom - 1,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("keydown", handleEscape);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const menu =
    isOpen && mounted
      ? createPortal(
          <ul
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="z-[9999] max-h-[200px] overflow-y-auto rounded-b-lg rounded-t-md border border-[#e8eaed] border-t-0 bg-white py-1 shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          >
            {options.map((option) => {
              const selected = value === option.value;
              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      onClose();
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[13px] transition-colors",
                      selected
                        ? "bg-[#fff5f3] font-semibold text-[#f05a45]"
                        : "text-[#374151] hover:bg-[#f9fafb]",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {selected && <CheckIcon />}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative min-w-0 flex-1">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          onClick={() => (isOpen ? onClose() : onOpen())}
          className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left transition-colors sm:px-5 sm:py-4"
        >
          <div className="min-w-0">
            <p className="text-[12px] text-[#9ca3af]">{label}</p>
            <p className="mt-0.5 truncate text-[15px] font-semibold text-[#111827]">{selectedLabel}</p>
          </div>
          <ChevronDown open={isOpen} />
        </button>
      </div>
      {menu}
    </>
  );
}
