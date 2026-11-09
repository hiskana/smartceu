import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Catalog from "@/pages/Catalog";
import CourseDetails from "@/pages/CourseDetails";
import Course from "@/pages/Course";
import {
  emptyProgress,
  readProgress,
  storageKey,
  downloadRecord,
} from "@/lib/learning";
function journey(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </MemoryRouter>,
  );
}
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
afterEach(cleanup);
describe("preview journey", () => {
  it("takes a new LVN learner from Home through details to the reader and remembers opening it", () => {
    journey();
    fireEvent.click(
      screen.getByRole("link", { name: "Vocational Nurse — explore learning" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "View course details" }));
    expect(
      screen.getByRole("link", { name: "← Back to LVN learning" }),
    ).toHaveAttribute("href", "/catalog?profession=lvn");
    expect(screen.getByText("0 CE hours")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Start free preview" }));
    expect(
      screen.getByRole("heading", { name: "Notice changes early" }),
    ).toBeInTheDocument();
    expect(readProgress().progress.startedAt).toBeTruthy();
    cleanup();
    journey();
    expect(
      screen.getByRole("link", { name: /Continue learning:/ }),
    ).toBeInTheDocument();
  });
  it("resumes saved practice and returns to the referenced section without losing answers", () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...emptyProgress(),
        read: [0, 1, 2],
        stage: "check",
        answers: { q1: 0 },
      }),
    );
    journey("/courses/de-escalation");
    fireEvent.click(screen.getByRole("link", { name: "Continue learning" }));
    expect(
      screen.getByRole("heading", { name: "Practice what you learned" }),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Review relevant section" }),
    );
    expect(
      screen.getByRole("heading", { name: "Notice changes early" }),
    ).toBeInTheDocument();
    expect(readProgress().progress.answers.q1).toBe(0);
  });
  it("rejects unavailable course ids and only downloads a completed record", () => {
    journey("/courses/missing");
    expect(screen.getByText("Course unavailable")).toBeInTheDocument();
    const create = vi.fn(() => "blob:preview");
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: create,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    downloadRecord(emptyProgress());
    expect(create).not.toHaveBeenCalled();
    downloadRecord({
      ...emptyProgress(),
      read: [0, 1, 2],
      answers: { q1: 1, q2: 0, q3: 2 },
      rating: "5",
      attested: true,
      completedAt: new Date().toISOString(),
    });
    expect(create).toHaveBeenCalledWith(expect.any(Blob));
    expect(click).toHaveBeenCalledOnce();
  });
});
