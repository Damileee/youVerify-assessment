import { mount } from "@vue/test-utils";
import ActivityList from "@/components/ActivityList.vue";
import IconsAvatar from "@/components/icons/Avatar.vue";
import { ActivityVariant } from "~/types/activity";

// Mock data
const mockActivities = [
  {
    id: "1",
    title: "Logged in",
    user: "John Doe",
    timestamp: "Sep 30, 2025",
    description: "User logged in to the system",
    highlight: "First login",
  },
  {
    id: "2",
    title: "",
    user: "Jane Doe",
    timestamp: "Sep 29, 2025",
    description: "Updated profile",
    highlight: "",
  },
];

describe("ActivityList", () => {
  it("renders all activities", () => {
    const wrapper = mount(ActivityList, {
      props: { activities: mockActivities },
      global: { components: { IconsAvatar } },
    });

    // Check number of activity items
    const activityItems = wrapper.findAll("h3");
    expect(activityItems).toHaveLength(mockActivities.length);

    // Check titles or users
    expect(activityItems[0]?.text()).toBe("Logged in");
    expect(activityItems[1]?.text()).toBe("Jane Doe");

    // Check timestamps
    const timestamps = wrapper.findAll("p.text-sm");
    expect(timestamps[0]?.text()).toBe("Sep 30, 2025");
    expect(timestamps[1]?.text()).toBe("Sep 29, 2025");

    // Check highlights
    expect(wrapper.text()).toContain("First login");
  });

  it("applies timeline variant correctly", () => {
    const wrapper = mount(ActivityList, {
      props: { activities: mockActivities, variant: ActivityVariant.TIMELINE },
      global: { components: { IconsAvatar } },
    });

    // Check that line divs exist for all but last item
    const lines = wrapper.findAll('[data-testid="timeline-line"]');
    expect(lines).toHaveLength(mockActivities.length - 1);
  });

  it("renders non-timeline variant with spacing", () => {
    const wrapper = mount(ActivityList, {
      props: { activities: mockActivities },
      global: { components: { IconsAvatar } },
    });

    // Check for the space-y-6 class
    expect(wrapper.classes()).toContain("space-y-6");
  });
});
