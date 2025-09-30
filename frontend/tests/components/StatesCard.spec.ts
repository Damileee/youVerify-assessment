import { mount } from "@vue/test-utils";
import StatesCard from "@/components/StatsCard.vue";
import { InvoiceStatus } from "@/types/invoice";
import IconsOverview from "@/components/icons/Overview.vue";

describe("StatesCard", () => {
  const defaultProps = {
    title: "Invoices",
    value: 1234.56,
    count: 5,
    currency: "$",
  };

  const statusCases = [
    { status: InvoiceStatus.PAID, bgClass: "bg-[#B6FDD3]" },
    { status: InvoiceStatus.OVERDUE, bgClass: "bg-[#FFB7BD]" },
    { status: InvoiceStatus.DRAFT, bgClass: "bg-[#D9D9E0]" },
    { status: InvoiceStatus.UNPAID, bgClass: "bg-[#F8E39B]" },
    { status: undefined, bgClass: "bg-[#F8E39B]" }, // default case
  ];

  it("renders title, count, value, and currency correctly", () => {
    const wrapper = mount(StatesCard, {
      props: defaultProps,
      global: { components: { IconsOverview } },
    });

    // Title uppercased
    expect(wrapper.text()).toContain(defaultProps.title.toUpperCase());

    // Count
    expect(wrapper.text()).toContain(defaultProps.count.toString());

    // Value integer + decimal
    expect(wrapper.html()).toContain("1,234");
    expect(wrapper.html()).toContain("56");

    // Currency
    expect(wrapper.text()).toContain(defaultProps.currency);
  });

  statusCases.forEach(({ status, bgClass }) => {
    it(`applies correct background class for status: ${status ?? "default"}`, () => {
      const wrapper = mount(StatesCard, { props: { ...defaultProps, status } });

      // Find the div with the status count
      const statusDiv = wrapper.find("[data-testid='status-count']");
      expect(statusDiv.attributes("class")).toContain(bgClass);
    });
  });
});
