import { mount } from "@vue/test-utils";
import RegisterPage from "@/pages/auth/register.vue";
import AuthForm from "~/components/AuthForm.vue";
import { vi } from "vitest";

const signUpMock = vi.fn();

vi.mock("@/composables/auth", () => {
  return {
    useSignUp: () => ({
      action: signUpMock,
      loading: { value: false },
    }),
  };
});

describe("RegisterPage", () => {
  it("renders register form with email and password inputs", () => {
    const wrapper = mount(RegisterPage, {
      global: { components: { AuthForm } },
    });


    expect(wrapper.text()).toContain("Create your account");
    const emailInput = wrapper.find("input[type='email']");
    expect(emailInput.exists()).toBe(true);
    const passwordInput = wrapper.find("input[type='password']");
    expect(passwordInput.exists()).toBe(true);
    expect(wrapper.find("button").text()).toContain("Sign up");
    expect(wrapper.text()).toContain("Already a member?");
    expect(wrapper.html()).toContain('/auth/login');
  });

  it("updates v-model when typing into inputs", async () => {
    const wrapper = mount(RegisterPage, {
      global: { components: { AuthForm } },
    });

    const emailInput = wrapper.find("input[type='email']");
    await emailInput.setValue("newuser@example.com");

    const passwordInput = wrapper.find("input[type='password']");
    await passwordInput.setValue("securePass123");

    expect((emailInput.element as HTMLInputElement).value).toBe("newuser@example.com");
    expect((passwordInput.element as HTMLInputElement).value).toBe("securePass123");
  });

  it("calls signup on form submit", async () => {
    const wrapper = mount(RegisterPage, {
      global: { components: { AuthForm } },
    });

    // Fill values
    await wrapper.find("input[type='email']").setValue("newuser@example.com");
    await wrapper.find("input[type='password']").setValue("securePass123");

    // Submit form
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");

    expect(signUpMock).toHaveBeenCalledWith({
      email: "newuser@example.com",
      password: "securePass123",
    });
  });
});