<template>
  <div class="p-6 md:p-0 md:sticky md:top-6">
    <h3 class="mb-4 text-lg font-semibold text-gray-900">Invoice Activity</h3>

    <ActivityList
      :activities="activities"
      :variant="ActivityVariant.TIMELINE"
    />
  </div>
</template>

<script setup lang="ts">
import ActivityList from "~/components/ActivityList.vue";
import { ActivityVariant, type ActivityItem } from "~/types/activity";

defineProps<{ activities: ActivityItem[] }>();
</script>
