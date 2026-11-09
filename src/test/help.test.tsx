import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HelpChat from "@/components/HelpChat";
import Index from "@/pages/Index";
import { emptyProgress, storageKey } from "@/lib/learning";
beforeEach(() => localStorage.clear());
afterEach(cleanup);
describe("friendly help and profession selection", () => {
  it("opens FAQs, answers accurately and returns to the question list", () => {
    render(
      <MemoryRouter>
        <HelpChat />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open SmartCEU help" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /Is this approved California CE/ }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("0 CE contact hours");
    fireEvent.click(screen.getByRole("button", { name: "All questions" }));
    fireEvent.click(
      screen.getByRole("button", { name: "How do I start learning?" }),
    );
    expect(
      screen.getByRole("link", { name: "View free preview" }),
    ).toHaveAttribute("href", "/courses/de-escalation");
    fireEvent.click(screen.getByRole("link", { name: "View free preview" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("explains the preview without adding text to the home screen", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Continue learning:/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "How SmartCEU works." }),
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("0 CE contact hours");
  });
  it("shows unfinished activity and hides a completed preview", () => {
    const p = { ...emptyProgress(), section: 1, read: [0] };
    localStorage.setItem(storageKey, JSON.stringify(p));
    const view = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: /Continue learning:/ }),
    ).toHaveAttribute("href", "/course/de-escalation");
    expect(
      screen.getByText(/Communicate with respect · Saved/),
    ).toBeInTheDocument();
    view.unmount();
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...p,
        read: [0, 1, 2],
        answers: { q1: 1, q2: 0, q3: 2 },
        rating: "5",
        attested: true,
        completedAt: new Date().toISOString(),
      }),
    );
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expect(
      screen.queryByRole("link", { name: /Continue learning:/ }),
    ).not.toBeInTheDocument();
  });
  it("carries the selected profession into the catalog link", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: "Vocational Nurse — explore learning" }),
    ).toHaveAttribute("href", "/catalog?profession=lvn");
  });
});
