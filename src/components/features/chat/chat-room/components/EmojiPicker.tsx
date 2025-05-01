import { Theme } from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const EmojiPickerComponent = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

type EmojiPickerProps = {
  message: string;
  showEmojiPicker: boolean;
  emojiPickerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  deleteButtonRef: React.RefObject<HTMLButtonElement>;
  onEmojiClick: (emojiData: EmojiClickData) => void;
  onDeleteLastEmoji: () => void;
  onToggleEmojiPicker: () => void;
};

export function EmojiPicker({
  message,
  showEmojiPicker,
  emojiPickerRef,
  inputRef,
  deleteButtonRef,
  onEmojiClick,
  onDeleteLastEmoji,
  onToggleEmojiPicker,
}: EmojiPickerProps) {
  return (
    <div className="flex-1 relative">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          inputMode="none"
          placeholder="クリックして絵文字を選択..."
          value={message}
          readOnly
          onClick={onToggleEmojiPicker}
          className="w-full h-12 bg-gray-100 border-none rounded-full px-4 text-2xl leading-none cursor-pointer focus:outline-none placeholder:text-base"
        />
        {message && (
          <button
            ref={deleteButtonRef}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteLastEmoji();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="fixed inset-x-4 bottom-24 z-50 bg-white rounded-lg shadow-lg md:absolute md:inset-x-auto md:bottom-full md:right-0 md:mb-2"
        >
          <div className="max-w-[95vw] w-full md:w-[350px]">
            <EmojiPickerComponent
              onEmojiClick={onEmojiClick}
              lazyLoadEmojis={true}
              width="100%"
              height={350}
              theme={Theme.LIGHT}
              searchDisabled={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
