<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑分类' : '添加分类'" @ok="handleConfirm">
    <a-form :model="form">
      <a-form-item field="name" label="类型名称">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="parent_id" label="父分类">
        <a-select v-model="form.parent_id" placeholder="请选择父分类，若不选择则默认为一级分类" allow-clear>
          <a-option v-for="category in primaryList" :key="category.id" :value="category.id">{{ category.name }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { Ref, PropType } from 'vue'
import type { ICategoryListItem } from '@/api/category'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  category: {
    type: Object as PropType<ICategoryListItem>,
    required: false
  }
})

const emit = defineEmits(['update:visible'])

const visible = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  }
})

const form: Ref<ICategoryListItem> = ref({

})

const primaryList: Ref<ICategoryListItem[]> = ref([
  {
    id: '1',
    name: 'back'
  },
  {
    id: '2',
    name: 'front'
  }
])

onMounted(() => {
  if (props.isEdit) form.value = props.category!
})

const handleConfirm = () => { }
</script>

<style lang="less" scoped></style>
