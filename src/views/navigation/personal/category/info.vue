<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑分类' : '添加分类'" :on-before-ok="handleConfirm">
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item field="name" label="类型名称" validate-trigger="change">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="parent_id" label="父分类">
        <a-select v-model="form.parent_id" placeholder="请选择父分类，若不选择则默认为一级分类" allow-clear>
          <a-option v-for="category in option" :key="category.id" :value="category.id">{{ category.name }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { createCategory, updateCategory } from '@/api/category'
import type { Ref, PropType } from 'vue'
import type { ICategoryListItem, CategoryOption } from '@/api/category'

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
  },
  option: {
    type: Object as PropType<CategoryOption[]>,
    required: false
  }
})

const formRef = ref(null!)

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
  parent_id: '',
  name: '',
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入分类名称',
    },
    {
      minLength: 0,
      maxLength: 15,
      message: '分类名称长度为0-15',
    }
  ]
}

onMounted(() => {
  if (props.isEdit) form.value = props.category!
})

const handleConfirm = () => {
  formRef.value.validate(async (err: undefined | Record<string, any>): Promise<any> => {
    if (!err) {
      if (props.isEdit) {
        const res = await updateCategory(form.value)
        if (res.code !== 20000) return false
      } else {
        const data = { ...form.value }
        if (!data.parent_id) data.parent_id = -1
        const res = await createCategory(form.value)
        if (res.code !== 20000) return false
      }
    }
    return true
  })
}
</script>

<style lang="less" scoped></style>
