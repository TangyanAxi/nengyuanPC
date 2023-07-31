// import { ref, toRefs } from 'vue';
// import { getDicts } from '@/services/api/dict';

// /**
//  * 获取字典数据
//  */
// export function useDict(args: any[]) {
//   const res = ref<any>({});
//   return (() => {
//     args.forEach((d) => {
//       res.value[d] = [];
//       getDicts(d).then((resp: any) => {
//         res.value[d] = resp.data.map((p: any) => ({ text: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }));
//       });
//     });
//     return toRefs(res.value);
//   })();
// }
