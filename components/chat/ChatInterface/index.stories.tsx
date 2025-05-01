import type { Meta, StoryObj } from "@storybook/react";
import { ChatInterface } from "./index";

const meta: Meta<typeof ChatInterface> = {
  title: "Chat/ChatInterface",
  component: ChatInterface,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orderId: {
      control: "text",
      description: "注文ID",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatInterface>;

export const Default: Story = {
  args: {
    orderId: "123",
  },
};
