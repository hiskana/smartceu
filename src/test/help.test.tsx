import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HelpChat from "@/components/HelpChat";
import Index from "@/pages/Index";
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
      screen.getByRole("link", { name: "Open free preview" }),
    ).toHaveAttribute("href", "/course/de-escalation");
    fireEvent.click(screen.getByRole("link", { name: "Open free preview" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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
