import fs from "fs";
import path from "path";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

const getVueHtml = async (data) => {
  const template = fs.readFileSync(path.join(path.resolve(), "/src/templates/template.html"), "utf8");
  const donutTemplate = fs.readFileSync(
    path.join(path.resolve(), "/src/templates/components/donut-chart.html"),
    "utf8"
  );

  // console.log(template);

  const app = createSSRApp({
    data: () => ({
      ...data,
    }),
    template: template,
  });

  app.component("donut-chart", {
    props: {
      width: {
        type: Number,
        default: 25,
      },
      data: Number,
      ranges: {
        type: Array,
        default: [
          { value: 3.5, color: "#ff5757" },
          { value: 4, color: "#ffdc50" },
          { value: 4.5, color: "#7ed957" },
          { value: 5, color: "#007f37" },
        ],
      },
    },
    data() {
      return {};
    },
    computed: {
      containerSize() {
        const containerSize = this.width * 2 + 20 + "px";
        console.log("containerSize", containerSize);
        return containerSize;
      },
      position() {
        const position = (this.containerSize.replace("px", "") / 2).toString() + "px";
        console.log("position", position);
        return position;
      },
      circunference() {
        return this.width * 2 * Math.PI;
      },
      progress() {
        return Math.max(Math.min(this.data / 5, 5), 0) * this.circunference;
      },
      strokeFill() {
        return `${this.progress} ${this.circunference - this.progress}`;
      },
      chartColor() {
        const ranges = this.ranges.sort((a, b) => {
          (a["value"] ?? 0) - (b["value"] ?? 0);
        });
        const range = ranges.find((x) => this.data <= x.value) ?? {};
        return range.color;
      },
    },
    template: donutTemplate,
  });

  app.component("bar-chart", {
    props: {
      width: {
        type: Number,
        default: 300,
      },
      data: Number,
      ranges: {
        type: Array,
        default: [
          { value: 3.5, color: "#ff5757" },
          { value: 4, color: "#ffdc50" },
          { value: 4.5, color: "#7ed957" },
          { value: 5, color: "#007f37" },
        ],
      },
    },
    data() {
      return {};
    },
    computed: {
      progress() {
        console.log;
        return (this.data / 5) * 100 + "%";
      },
      chartColor() {
        const ranges = this.ranges.sort((a, b) => {
          (a["value"] ?? 0) - (b["value"] ?? 0);
        });
        const range = ranges.find((x) => this.data <= x.value) ?? {};
        return range.color;
      },
    },
    template: `<div class="bar container">
    <div class="progress" :style="{width:progress,backgroundColor:chartColor}"><slot></slot></div>
    </div>`,
  });

  app.component("score-box", {
    props: {
      width: {
        type: String,
        default: "100%",
      },
      showData: Boolean,
      height: {
        type: String,
        default: "30px",
      },
      data: Number,
      ranges: {
        type: Array,
        default: [
          { value: 3.5, color: "#ff5757" },
          { value: 4, color: "#ffdc50" },
          { value: 4.5, color: "#7ed957" },
          { value: 5, color: "#007f37" },
        ],
      },
    },
    data() {
      return {};
    },
    computed: {
      color() {
        const ranges = this.ranges.sort((a, b) => {
          (a["value"] ?? 0) - (b["value"] ?? 0);
        });
        const range = ranges.find((x) => this.data <= x.value) ?? {};
        return range.color;
      },
    },
    template: `<div style="border-radius: 2px; vertical-align:middle;text-align:center" :style="{height: height, width: width, backgroundColor: color}">
      <label v-if="showData">{{data}}</label>
      </div>`,
  });

  return await renderToString(app);
};

export default getVueHtml;
