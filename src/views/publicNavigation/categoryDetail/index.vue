<template>
  <div class="container">
    <Breadcrumb
      :items="[
        $t('menu.categoryManagement.public'),
        isEdit
          ? $t('menu.categoryManagement.public.edit')
          : $t('menu.categoryManagement.public.add'),
      ]"
    />
    <a-card
      class="general-card"
      :title="
        isEdit
          ? $t('operation.categoryManagement.public.edit')
          : $t('operation.categoryManagement.public.add')
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
          field="icon"
          :label="$t('categoryManagement.form.icon')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.icon"
            :placeholder="$t('categoryManagement.form.icon.placeholder')"
            allow-clear
          />
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
    createPublicCategory,
    updatePublicCategory,
    getPublicCategoryById,
  } from '@/api/publicCategory';
  import { useRoute, useRouter } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import useUserStore from '@/store/modules/user';
  import { Message } from '@arco-design/web-vue';

  import type { PublicCategory } from '@/api/publicCategory';

  const userStore = useUserStore();
  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<PublicCategory>({
    id: undefined!,
    name: '',
    icon: '',
    create_time: '',
  });

  const isEdit = computed<boolean>(() => !!route.query.id);

  const handleAddCategory = () => {
    setLoading(true);
    const data = {
      ...formData.value,
      userId: Number(userStore.userInfo.id),
    };
    createPublicCategory(data)
      .then(() => {
        Message.success('添加成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCategory = () => {
    setLoading(true);
    const data = {
      ...formData.value,
      userId: Number(userStore.userInfo.id),
    };
    updatePublicCategory(data)
      .then(() => {
        Message.success('修改成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategoryDetail = () => {
    getPublicCategoryById(Number(route.query.id)).then((res) => {
      formData.value = res.data;
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      if (isEdit.value) {
        handleEditCategory();
      } else {
        handleAddCategory();
      }
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };

  onMounted(() => {
    if (isEdit.value) {
      getCategoryDetail();
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
