import TopicStatusFilter from "../../components/topic-status-filter";

const enabledCategoryIds = settings.enabled_categories
  .split("|")
  .filter(Boolean)
  .map((id) => parseInt(id, 10));

function shouldShow(currentCategory) {
  if (enabledCategoryIds.length === 0) {
    return true;
  }
  return currentCategory && enabledCategoryIds.includes(currentCategory.id);
}

<template>
  {{#if (shouldShow @outletArgs.currentCategory)}}
    <li class="bread-crumbs-right-outlet topic-status-filter">
      <TopicStatusFilter />
    </li>
  {{/if}}
</template>
