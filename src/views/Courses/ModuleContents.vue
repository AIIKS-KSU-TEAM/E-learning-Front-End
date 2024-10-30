<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Module Contents</h2>
      <form @submit.prevent="createContent" class="mb-4">
        <select v-model="newContent.moduleId" class="border rounded p-2 mr-2" required>
          <option value="">Select Module</option>
          <option v-for="module in modules" :key="module.id" :value="module.id">{{ module.title }}</option>
        </select>
        <textarea v-model="newContent.content" placeholder="Content" class="border rounded p-2 mr-2" required></textarea>
        <button type="submit" class="bg-blue-500 text-white rounded p-2">Add Content</button>
      </form>
      <ul>
        <li v-for="content in contents" :key="content.id" class="flex justify-between items-center border-b py-2">
          <span>{{ content.content }} - {{ content.module.title }}</span>
          <div>
            <button @click="editContent(content)" class="text-blue-500">Edit</button>
            <button @click="deleteContent(content.id)" class="text-red-500 ml-2">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axiosconfig/axiosInstance';
  
  export default {
    props: {
      moduleId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        contents: [],
        newContent: {
          moduleId: this.moduleId,
          content: '',
        },
        modules: [],
      };
    },
    created() {
      this.fetchContents();
    },
    methods: {
      async fetchContents() {
        const response = await axios.get(`api/module-contents/?moduleId=${this.moduleId}`);
        this.contents = response.data;
      },
      async createContent() {
        await axios.post('api/module-contents/', this.newContent);
        this.newContent = { moduleId: this.moduleId, content: '' };
        this.fetchContents();
      },
      async editContent(content) {
        const newContent = prompt("Edit Content", content.content);
        if (newContent) {
          await axios.patch(`api/module-contents/${content.id}/`, { content: newContent });
          this.fetchContents();
        }
      },
      async deleteContent(id) {
        if (confirm("Are you sure you want to delete this content?")) {
          await axios.delete(`api/module-contents/${id}/`);
          this.fetchContents();
        }
      },
    },
  };
  </script>
  