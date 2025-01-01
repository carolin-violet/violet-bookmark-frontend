<template>
  <div>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>更改分类</template>
      <div>
        <a-tree-select
          v-model="categoryId"
          :data="treeData"
          :field-names="{ key: 'id', title: 'name' }"
          placeholder="请选择分类"
          style="width: 300px"
          :allow-search="true"
          :allow-clear="true"
          :filter-tree-node="filter"
          :selectable="handleSelectable"
        >
        </a-tree-select
      ></div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, h, getCurrentInstance } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { IconUser, IconUserGroup } from '@arco-design/web-vue/es/icon';
  import { updateNavigation } from '@/api/navigation';
  import { getAllCategory } from '@/api/category';
  import type { TreeCategoryNode } from '@/api/category';

  interface TreeNodeData {
    [key: string]: any;
  }

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

  const instance = getCurrentInstance();

  const treeData = ref<TreeNodeData[]>();
  const categoryId = ref<number>(null!);

  const getData = () => {
    getAllCategory().then((res) => {
      treeData.value = res.data.map((item: TreeNodeData) => {
        item.icon = () => h(item.openness ? IconUserGroup : IconUser);
        item.children = item.children.map((child: TreeNodeData) => {
          child.icon = () => h(item.openness ? IconUserGroup : IconUser);
          return child;
        });
        return item;
      });
    });
  };

  onMounted(() => {
    getData();
  });

  const filter = (key: string, node: TreeNodeData) => {
    if (node.parentId === -1) {
      return node.name.includes(key);
    }

    const parent = treeData.value?.find((item) => item.id === node.parentId);

    return parent?.name.includes(key) || node.name.includes(key);
  };

  const handleSelectable = (node: TreeNodeData) => {
    return node.parentId !== -1;
  };

  const changeCategory = () => {
    const formData = { id: props.websiteId, categoryId: categoryId.value };
    updateNavigation(formData).then(() => {
      Message.success('修改成功');
      instance?.proxy?.$Bus.emit('transferSuccess');
    });
  };

  const handleOk = () => {
    changeCategory();
  };

  const handleCancel = () => {
    console.log('cancel');
  };
</script>
