<template>
  <div class="container">
    <Breadcrumb
      :items="[
        $t('menu.websiteManagement.personal'),
        isEdit
          ? $t('menu.websiteManagement.personal.edit')
          : $t('menu.websiteManagement.personal.add'),
      ]"
    />
    <a-card
      class="general-card"
      :title="
        isEdit
          ? $t('operation.websiteManagement.personal.edit')
          : $t('operation.websiteManagement.personal.add')
      "
    >
      <a-tabs v-model="tableKey" destroy-on-hide @change="handleChangeTabKey">
        <a-tab-pane key="1" title="手动输入">
          <a-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            class="form"
            :label-col-props="{ span: 8 }"
            :wrapper-col-props="{ span: 16 }"
          >
            <a-form-item
              field="url"
              :label="$t('websiteManagement.form.url')"
              validate-trigger="change"
            >
              <a-input
                v-model="formData.url"
                :placeholder="$t('websiteManagement.form.url.placeholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="name"
              :label="$t('websiteManagement.form.name')"
              validate-trigger="change"
            >
              <a-input
                v-model="formData.name"
                :placeholder="$t('websiteManagement.form.name.placeholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="description"
              :label="$t('websiteManagement.form.description')"
              validate-trigger="change"
            >
              <a-textarea
                v-model="formData.description"
                :auto-size="{ minRows: 2, maxRows: 5 }"
                :placeholder="
                  $t('websiteManagement.form.description.placeholder')
                "
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="ladder"
              :label="$t('websiteManagement.form.ladder')"
            >
              <a-radio-group v-model="formData.ladder">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" :loading="loading" @click="validate">
                  {{ $t('operation.websiteManagement.save') }}
                </a-button>
                <a-button type="secondary" @click="reset">
                  {{ $t('operation.websiteManagement.reset') }}
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" title="自动解析">
          <small>
            <icon-exclamation-circle-fill />
            自动解析只适用于国内网站
          </small>
          <a-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            class="form"
            :label-col-props="{ span: 8 }"
            :wrapper-col-props="{ span: 16 }"
          >
            <a-form-item
              field="url"
              :label="$t('websiteManagement.form.url')"
              validate-trigger="change"
            >
              <a-input
                v-model="formData.url"
                :placeholder="$t('websiteManagement.form.url.placeholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" :loading="loading" @click="validate">
                  {{ $t('operation.websiteManagement.save') }}
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
  import {
    getWebsiteById,
    updateWebsite,
    createWebsite,
    createWebsiteByUrl,
  } from '@/api/website';
  import { useRoute, useRouter } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  import type { Website } from '@/api/website';

  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<Partial<Website>>({
    id: 0,
    categoryId: 0,
    name: '',
    url: '',
    description: '',
    ladder: 0,
  });
  const tableKey = ref(1);

  const isEdit = computed<boolean>(() => !!route.query.id);

  const rules = {
    name: [
      {
        required: true,
        message: '请输入导航名称',
      },
      {
        minLength: 0,
        maxLength: 32,
        message: '导航名称长度为0-32',
      },
    ],
    url: [
      {
        required: true,
        message: '请输入导航地址',
      },
      {
        minLength: 0,
        maxLength: 255,
        message: '导航地址长度为0-255',
      },
    ],
    description: [
      {
        minLength: 0,
        maxLength: 256,
        message: '描述长度为0-256',
      },
    ],
    ladder: [
      {
        required: true,
        message: '请选择是否需要梯子',
      },
    ],
  };

  const handleChangeTabKey = (val: any) => {
    tableKey.value = val;
  };

  const handleAddWebsite = () => {
    setLoading(true);
    createWebsite({
      ...formData.value,
      categoryId: Number(route.query.categoryId),
    })
      .then(() => {
        Message.success('添加成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditWebsite = () => {
    setLoading(true);
    updateWebsite({
      ...formData.value,
      categoryId: Number(route.query.categoryId),
    })
      .then(() => {
        Message.success('修改成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleParseWebsite = () => {
    setLoading(true);
    createWebsiteByUrl({
      ...formData.value,
      categoryId: Number(route.query.categoryId),
    })
      .then(() => {
        Message.success('解析成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserById = () => {
    getWebsiteById(Number(route.query.id)).then((res) => {
      formData.value = res.data;
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // console.log('tableKey.value', tableKey.value);
      if (tableKey.value === 1) {
        if (isEdit.value) {
          handleEditWebsite();
        } else {
          handleAddWebsite();
        }
      } else {
        handleParseWebsite();
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
