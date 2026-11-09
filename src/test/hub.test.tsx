import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Hub from "@/pages/Hub";
import { fetchHub, changeHub } from "@/lib/hub";
vi.mock("@/lib/hub", async () => ({
  ...(await vi.importActual("@/lib/hub")),
  fetchHub: vi.fn(),
  changeHub: vi.fn(),
}));
const task = {
  id: "11111111-1111-4111-8111-111111111111",
  title: "Review the course",
  details: "Check objectives",
  status: "To Do",
  owner: "Matthew",
  category: "Courses",
  sourcePost: null,
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
beforeEach(() => {
  localStorage.clear();
  vi.mocked(fetchHub).mockResolvedValue({
    tasks: [task],
    posts: [],
    serverTime: new Date().toISOString(),
  } as Awaited<ReturnType<typeof fetchHub>>);
  vi.mocked(changeHub).mockResolvedValue();
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
function show() {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <Hub />
    </QueryClientProvider>,
  );
}
describe("Hub collaboration", () => {
  it("loads the board and sends a separate task move", async () => {
    show();
    await screen.findByText("Review the course");
    fireEvent.change(screen.getByLabelText("Status for Review the course"), {
      target: { value: "Doing" },
    });
    await waitFor(() =>
      expect(changeHub).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "update",
          version: 1,
          task: expect.objectContaining({ status: "Doing" }),
        }),
      ),
    );
  });
  it("posts as Matthew and clears the draft only after confirmed success", async () => {
    show();
    await screen.findByText("Review the course");
    fireEvent.change(screen.getByLabelText("Posting as"), {
      target: { value: "Matthew" },
    });
    fireEvent.change(screen.getByLabelText("What’s on your mind?"), {
      target: { value: "Try a PT interview" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post to Hub" }));
    await screen.findByText("Posted to the shared discussion.");
    expect(changeHub).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "post",
        post: expect.objectContaining({
          author: "Matthew",
          body: "Try a PT interview",
        }),
      }),
    );
    expect(screen.getByLabelText("What’s on your mind?")).toHaveValue("");
  });
  it("keeps a failed post draft and reports the error", async () => {
    vi.mocked(changeHub).mockRejectedValue(new Error("Storage unavailable"));
    show();
    await screen.findByText("Review the course");
    fireEvent.change(screen.getByLabelText("What’s on your mind?"), {
      target: { value: "Keep this idea" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post to Hub" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("What’s on your mind?")).toHaveValue(
      "Keep this idea",
    );
    expect(localStorage.getItem("smartceu.hub.draft")).toBe("Keep this idea");
  });
});
