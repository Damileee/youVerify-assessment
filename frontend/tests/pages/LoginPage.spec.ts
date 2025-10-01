import { mount } from "@vue/test-utils";
import LoginPage from "@/pages/auth/login.vue";
import AuthForm from "~/components/AuthForm.vue";
import { vi } from "vitest";

const loginMock = vi.fn();

vi.mock("~/composables/auth/useSignIn", () => {
  return {
    useSignIn: () => ({
      action: loginMock,
      loading: { value: false },
    }),
  };
});

describe("LoginPage", () => {
  it("renders login form", () => {
    const wrapper = mount(LoginPage, {
      global: { components: { AuthForm } },
    });

    expect(wrapper.text()).toContain("Sign in to your account");
    expect(wrapper.find("input[type='email']").exists()).toBe(true);
    expect(wrapper.find("input[type='password']").exists()).toBe(true);
    expect(wrapper.find("button").text()).toContain("Sign in");
  });

  it("updates v-model when typing", async () => {
    const wrapper = mount(LoginPage, {
      global: { components: { AuthForm } },
    });

    const emailInput = wrapper.find("input[type='email']");
    await emailInput.setValue("test@example.com");

    const passwordInput = wrapper.find("input[type='password']");
    await passwordInput.setValue("password123");

    expect((emailInput.element as HTMLInputElement).value).toBe("test@example.com");
    expect((passwordInput.element as HTMLInputElement).value).toBe("password123");
  });

  it("calls login on submit", async () => {
    const wrapper = mount(LoginPage, {
      global: { components: { AuthForm } },
    });

    await wrapper.find("form").trigger("submit.prevent");

    expect(loginMock).toHaveBeenCalled();
  });
});