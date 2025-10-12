import { useRef, useCallback } from "react";

export function usePointerClick({
                                    onSingleClick,
                                    onDoubleClick,
                                    delay = 250,
                                }: {
    onSingleClick?: () => void;
    onDoubleClick?: () => void;
    delay?: number;
}) {
    const lastClickTime = useRef(0);
    const singleClickTimer = useRef<NodeJS.Timeout | null>(null);

    const handlePointerUp = useCallback(() => {

        const now = Date.now();
        const diff = now - lastClickTime.current;

        if (diff < delay && lastClickTime.current !== 0) {
            // 더블클릭
            if (singleClickTimer.current) {
                clearTimeout(singleClickTimer.current);
                singleClickTimer.current = null;
            }
            onDoubleClick?.();
            lastClickTime.current = 0;
        } else {
            // 싱글클릭 후보 → 잠시 대기
            if (singleClickTimer.current) clearTimeout(singleClickTimer.current);
            singleClickTimer.current = setTimeout(() => {
                onSingleClick?.();
                singleClickTimer.current = null;
            }, delay);
            lastClickTime.current = now;
        }
    }, [delay, onSingleClick, onDoubleClick]);

    return { handlePointerUp };
}
