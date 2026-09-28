import { renderHook } from "@testing-library/react";
import useCurrentYear from "./useCurrentYear";

test("retorna o ano corrente", () => {
    const { result } = renderHook(() => useCurrentYear());
    expect(result.current).toBe(new Date().getFullYear());
});
