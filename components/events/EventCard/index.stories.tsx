import { Meta, StoryObj } from "@storybook/react";
import { EventCard } from "./index";

const meta = {
  title: "Events/EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    event: {
      control: "object",
      description: "イベント情報",
    },
  },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    event: {
      id: "1",
      name_ja: "サマーフェスティバル2024",
      name_zh: "2024夏季音乐节",
      description_ja: "夏の一大イベント！",
      description_zh: "夏季大型活动！",
      date: "2024-08-15T18:00:00+09:00",
      location_ja: "東京ドーム",
      location_zh: "东京巨蛋",
      created_at: "2024-01-01T00:00:00+09:00",
      image_url:
        "https://images.pexels.com/photos/3800541/pexels-photo-3800541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      ticket_types: [
        {
          id: "1",
          event_id: "1",
          name: "一般チケット",
          description: "一般入場チケット",
          price: 5000,
          available_seats: 100,
          created_at: "2024-01-01T00:00:00+09:00",
        },
        {
          id: "2",
          event_id: "1",
          name: "VIPチケット",
          description: "VIP特典付きチケット",
          price: 15000,
          available_seats: 50,
          created_at: "2024-01-01T00:00:00+09:00",
        },
      ],
    },
  },
};
