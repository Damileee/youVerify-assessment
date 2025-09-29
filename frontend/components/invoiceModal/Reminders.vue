<template>
  <div class="mb-6">
    <div
      class="flex items-center flex-wrap gap-3 border border-[#E3E6EF] rounded-3xl p-6 w-fit"
    >
      <span class="text-xs text-[#666F77]">REMINDERS</span>

      <button
        v-for="(reminder, index) in reminders"
        :key="index"
        @click="toggleReminder(index)"
        :class="[
          'flex items-center gap-[10px] py-3 px-4 rounded-3xl text-sm font-medium transition-colors',
          reminder.selected
            ? 'bg-[#E6FFF0] text-[#373B47]'
            : 'bg-white border border-[#E3E6EF] text-[#373B47]',
        ]"
      >
        <span>{{ reminder.label }}</span>
        <IconsCheckMark v-if="reminder.selected" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconsCheckMark } from "#components";

interface Reminder {
  label: string;
  selected: boolean;
}

const reminders = ref<Reminder[]>([
  { label: "14 days before due date", selected: true },
  { label: "7 days before due date", selected: true },
  { label: "3 days before due date", selected: false },
  { label: "24 hrs before due date", selected: false },
  { label: "On the due date", selected: false },
]);

function toggleReminder(index: number) {
  if (!reminders.value[index]) return;
  reminders.value[index].selected = !reminders.value[index].selected;
}
</script>