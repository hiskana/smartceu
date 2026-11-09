import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Course from "@/pages/Course";
import Dashboard from "@/pages/Dashboard";
import {
  canComplete,
  emptyProgress,
  readProgress,
  storageKey,
} from "@/lib/learning";

function renderCourse(path = "/course/de-escalation") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </MemoryRouter>,
  );
}
beforeEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});
describe("preview learning flow", () => {
  it("requires reading, correct responses, evaluation and attestation; resumes after remount", () => {
    const view = renderCourse();
    expect(screen.getByRole("button", { name: "2. Practice" })).toBeDisabled();
    fireEvent.click(
      screen.getByRole("button", { name: "Mark section read & continue" }),
    );
    view.unmount();
    renderCourse();
    expect(
      screen.getByRole("heading", { name: "Communicate with respect" }),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Mark section read & continue" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Mark section read" }));
    fireEvent.click(screen.getByRole("button", { name: "Start practice" }));
    fireEvent.click(
      screen.getByLabelText("Assume you know why they are upset."),
    );
    expect(screen.getByText(/Review and try again/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue to reflection" }),
    ).toBeDisabled();
    fireEvent.click(
      screen.getByLabelText("Notice the change and ask about their concern."),
    );
    fireEvent.click(
      screen.getByLabelText("Coordinate one primary communicator."),
    );
    fireEvent.click(
      screen.getByLabelText(
        "Follow facility emergency procedures and seek trained help.",
      ),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Continue to reflection" }),
    );
    expect(
      screen.getByRole("button", { name: "Complete preview" }),
    ).toBeDisabled();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Complete preview" }));
    const saved = readProgress().progress;
    expect(saved.completedAt).toBeTruthy();
    expect(saved.attempts).toHaveLength(4);
    expect(saved.stage).toBe("finish");
    cleanup();
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getByText("0 CE contact hours earned")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download preview record" }),
    ).toBeInTheDocument();
  });
  it("handles malformed storage and rejects incomplete completion records", () => {
    localStorage.setItem(storageKey, "{bad");
    expect(readProgress().error).toBe(true);
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...emptyProgress(),
        completedAt: new Date().toISOString(),
      }),
    );
    expect(readProgress().progress.completedAt).toBeUndefined();
    expect(canComplete(emptyProgress())).toBe(false);
  });
  it("shows a recoverable storage failure and unavailable course state", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Full");
    });
    renderCourse();
    fireEvent.click(
      screen.getByRole("button", { name: "Mark section read & continue" }),
    );
    expect(
      screen.getByText(/Progress could not be restored or saved/),
    ).toBeInTheDocument();
    cleanup();
    renderCourse("/course/implicit-bias");
    expect(screen.getByText("Course unavailable")).toBeInTheDocument();
  });
});
