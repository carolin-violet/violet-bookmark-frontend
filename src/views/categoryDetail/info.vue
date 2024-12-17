<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.categoryManagement.personal',
        isEdit
          ? 'menu.categoryManagement.personal.edit'
          : 'menu.categoryManagement.personal.add',
      ]"
    />
    <a-card
      class="general-card"
      :title="
        isEdit
          ? 'operation.categoryManagement.personal.edit'
          : 'operation.categoryManagement.personal.add'
      "
    >
      <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          field="name"
          :label="$t('categoryManagement.form.name')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.name"
            :placeholder="$t('categoryManagement.form.name.placeholder')"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          field="parentId"
          :label="$t('categoryManagement.form.parentId')"
        >
          <a-select
            v-model="formData.parentId"
            :placeholder="$t('categoryManagement.form.parentId.placeholder')"
          >
            <a-option
              v-for="category in option"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</a-option
            >
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="validate">
              {{ $t('operation.categoryManagement.save') }}
            </a-button>
            <a-button type="secondary" @click="reset">
              {{ $t('operation.categoryManagement.reset') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    updateCategory,
    createCategory,
    getCategoryById,
  } from '@/api/category';
  import { useRoute, useRouter } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  import type { ICategoryListItem } from '@/api/category';

  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<ICategoryListItem>({
    id: undefined!,
    userId: '',
    name: '',
    parentId: 0,
    create_time: '',
    children: [],
    navigation: [],
    isLeaf: false,
  });

  const options = ref<ICategoryListItem[]>([]);

  const isEdit = computed<boolean>(() => !!route.query.id);

  const handleAddUser = () => {
    setLoading(true);
    createCategory(formData.value as ICategoryListItem)
      .then(() => {
        Message.success('添加成功!');
        router.push('/user_management/user_list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditUser = () => {
    setLoading(true);
    updateCategory(formData.value)
      .then(() => {
        Message.success('修改成功!');
        router.push('/user_management/user_list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserById = () => {
    getCategoryById(route.query.id as number).then((res) => {
      formData.value = res.data;
    });
    getCategoryById(-1).then((res) => {
      options.value = res.data;
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      if (isEdit.value) {
        handleEditUser();
      } else {
        handleAddUser();
      }
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };

  onMounted(() => {
    if (isEdit.value) {
      handleGetUserById();
    }
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
