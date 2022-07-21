<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      v-for="item in tableColumns"
      :key="item.label"
      :width="item.width"
      :fixed="item.fixed"
    />
  </el-table>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, onMounted, computed } from "vue";
const tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    zip: "100000",
    country: "USA",
    phone: "1234-5678-9012",
    email: "",
    website: "",
    company: "",
    aaa: "",
    bbb: "",
    ccc: "",
    ddd: "",
    eee: "",
    fff: "",
    ggg: "",
  },
]);
const tableColumns = [
  {
    label: "Date",
    prop: "date",
    width: 180,
    fixed: "left",
  },
  {
    label: "Name",
    prop: "name",
    width: 180,
  },
  {
    label: "Address",
    prop: "address",
  },
  {
    label: "Zip",
    prop: "zip",
    width: 180,
  },
  {
    label: "Country",
    prop: "country",
    width: 180,
  },
  {
    label: "Phone",
    prop: "phone",
  },
  {
    lable: "Email",
    prop: "email",
  },
  {
    lable: "Website",
    prop: "website",
  },
  {
    lable: "Company",
    prop: "company",
  },
  {
    lable: "AAA",
    prop: "aaa",
  },
  {
    lable: "BBB",
    prop: "bbb",
  },
  {
    lable: "CCC",
    prop: "ccc",
  },
  {
    lable: "DDD",
    prop: "ddd",
  },
  {
    lable: "EEE",
    prop: "eee",
  },
  {
    lable: "FFF",
    prop: "fff",
  },
  {
    lable: "GGG",
    prop: "ggg",
    fixed: "right",
  },
];
</script>
