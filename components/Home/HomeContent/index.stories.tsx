import { Meta, StoryObj } from "@storybook/react";
import { HomeContent } from "./index";

const meta = {
  title: "Home/HomeContent",
  component: HomeContent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    events: {
      control: "object",
      description: "イベント一覧",
    },
  },
} satisfies Meta<typeof HomeContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: [
      {
        id: "1",
        name_ja: "サマーフェスティバル2024",
        name_zh: "2024夏季音乐节",
        description_ja: "夏の一大イベント！",
        description_zh: "夏季大型活动！",
        date: "2024-08-15T18:00:00+09:00",
        location_ja: "東京ドーム",
        location_zh: "东京巨蛋",
        created_at: "2024-01-01T00:00:00+09:00",
        image_url: "https://example.com/image.jpg",
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
        ],
      },
      {
        id: "2",
        name_ja: "ウィンター・ワンダーランド",
        name_zh: "冬季仙境",
        description_ja: "冬の魔法の世界へようこそ",
        description_zh: "欢迎来到冬季魔法世界",
        date: "2024-12-20T17:00:00+09:00",
        location_ja: "横浜アリーナ",
        location_zh: "横滨体育馆",
        created_at: "2024-01-01T00:00:00+09:00",
        image_url: "https://example.com/image.jpg",
        ticket_types: [
          {
            id: "2",
            event_id: "2",
            name: "VIP Ticket",
            description: "VIP特典付きチケット",
            price: 15000,
            available_seats: 50,
            created_at: "2024-01-01T00:00:00+09:00",
          },
        ],
      },
    ],
  },
};
