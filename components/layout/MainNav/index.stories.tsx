import type { Meta, StoryObj } from "@storybook/react";
import { MainNav } from "./index";

const meta: Meta<typeof MainNav> = {
  title: "Layout/MainNav",
  component: MainNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainNav>;

export const Default: Story = {
  args: {},
};
