import { Database } from "@/types/supabase";
import type { Meta, StoryObj } from "@storybook/react";
import { TicketSelection } from "./index";

const meta: Meta<typeof TicketSelection> = {
  title: "Events/TicketSelection",
  component: TicketSelection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TicketSelection>;

const mockTicketTypes: Database["public"]["Tables"]["ticket_types"]["Row"][] = [
  {
    id: "1",
    event_id: "1",
    name: "一般入場券",
    description: "イベントの標準チケット",
    price: 5000,
    available_seats: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    event_id: "1",
    name: "VIPチケット",
    description: "特別特典付きVIPチケット",
    price: 10000,
    available_seats: 50,
    created_at: new Date().toISOString(),
  },
];

export const Default: Story = {
  args: {
    ticketTypes: mockTicketTypes,
  },
};
