import type { Meta, StoryObj } from '@storybook/react';
import { LanguageToggle } from './index';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Events/LanguageToggle',
  component: LanguageToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {
  args: {},
};
