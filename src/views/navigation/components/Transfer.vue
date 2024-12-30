<template>
  <div>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>更改分类</template>
      <div>
        <a-tree-select
          v-model="selected"
          :data="treeData"
          placeholder="Please select ..."
          style="width: 300px"
        ></a-tree-select
      ></div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { updateNavigation } from '@/api/navigation';
  import { getAllCategory } from '@/api/category';
  import type { TreeCategoryNode } from '@/api/category';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      require: true,
    },
    websiteId: {
      type: Number,
      require: true,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emit('update:modelValue', val);
    },
  });

  const treeData = ref<TreeCategoryNode[]>();
  const categoryId = ref<number>(null!);
  const getData = () => {
    getAllCategory().then((res) => {
      treeData.value = res;
    });
  };

  onMounted(() => {
    getData();
  });

  const changeCategory = () => {
    const formData = { id: props.websiteId, categoryId: categoryId.value };
    updateNavigation(formData);
  };

  const handleOk = () => {};

  const handleCancel = () => {};
</script>
