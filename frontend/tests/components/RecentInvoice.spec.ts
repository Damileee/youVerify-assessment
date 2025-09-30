import { mount } from "@vue/test-utils";
import RecentInvoices from "@/components/RecentInvoices.vue";
import InvoiceItem from "@/components/InvoiceItem.vue";
import ContainerInvoice from "@/components/container/invoice.vue";
import { InvoiceStatus } from "~/types/invoice";
import { formatNumber } from "@/utils/formatNumber";

// Mock data
const mockInvoiceGroups = [
  {
    date: "Sep 25, 2025",
    invoices: [
      {
        id: "1",
        title: "Invoice #001",
        amount: 200,
        status: InvoiceStatus.PAID,
        dueDate: "2025-10-05",
      },
      {
        id: "2",
        title: "Invoice #002",
        amount: 150,
        status: InvoiceStatus.OVERDUE,
        dueDate: "2025-10-05",
      },
    ],
  },
  {
    date: "Sep 24, 2025",
    invoices: [
      {
        id: "3",
        title: "Invoice #003",
        amount: 300,
        status: InvoiceStatus.OVERDUE,
        dueDate: "2025-10-05",
      },
    ],
  },
];

describe("RecentInvoice", () => {
  it("renders invoice groups with correct dates", () => {
    const wrapper = mount(RecentInvoices, {
      props: { invoiceGroups: mockInvoiceGroups },
      global: {
        provide: {
          formatNumber,
        },
        components: { InvoiceItem, ContainerInvoice },
      },
    });

    // Check if group headers are rendered
    expect(wrapper.text()).toContain("Sep 25, 2025");
    expect(wrapper.text()).toContain("Sep 24, 2025");
  });

  it("renders all invoices inside groups", () => {
    const wrapper = mount(RecentInvoices, {
      props: { invoiceGroups: mockInvoiceGroups },
      global: {
        provide: {
          formatNumber,
        },
        components: { InvoiceItem, ContainerInvoice },
      },
    });

    // Find all invoice items
    const invoiceItems = wrapper.findAllComponents(InvoiceItem);
    expect(invoiceItems).toHaveLength(3); // 2 + 1
  });

  it("emits selectedInvoice when an invoice is clicked", async () => {
    const wrapper = mount(RecentInvoices, {
      props: { invoiceGroups: mockInvoiceGroups },
      global: {
        provide: {
          formatNumber,
        },
        components: { InvoiceItem, ContainerInvoice },
      },
    });

    // Simulate emitting from InvoiceItem
    await wrapper
      .findComponent({ name: "InvoiceItem" })
      .vm.$emit("select", "1");

    expect(wrapper.emitted("selectedInvoice")).toBeTruthy();
    expect(wrapper.emitted("selectedInvoice")![0]).toEqual(["1"]);
  });
});
