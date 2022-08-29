<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 200px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  props: { value: String },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: this.value,
      text: "",
      toolbarConfig: {
        // 菜单栏配置
        toolbarKeys: [
          "bold",
          "italic",
          "underline",
          "color",
          "headerSelect",
          "|",
          "justifyLeft",
          "justifyCenter",
          "justifyRight",
          "divider",
          "|",
          "clearStyle",
          "undo",
          "redo",
          "fullScreen",
        ],
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      // console.log("editor", editor);
      // console.log("menukeys", editor.getAllMenuKeys()); // 查看所有keys
      // console.log("getConfig", editor.getConfig().MENU_CONF); // 查看当前菜单配置
    },
    onChange(editor) {
      this.text = editor.getText();
      this.$emit("send", { html: this.html, text: this.text });
    },
  },
  // 监听父组件传来的value，发生改变则更新编辑器内容
  watch: {
    value(newVal, oldVal) {
      this.html = newVal;
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {2
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
