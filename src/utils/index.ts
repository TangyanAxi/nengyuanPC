import { isObject } from '@/utils/is';

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * 获取静态图片
 * @param path
 * @returns
 */
export function getStaticImage(path: string) {
  const fullPath = `/src/static/images/${path}`;
  const modules: any = import.meta.glob('/src/static/images/**/*', { eager: true });
  return modules[fullPath].default;
}

// 回显数据字典
export function selectDictLabel(datas: any, value: any, map = { label: 'label', value: 'value' }) {
  if (value === undefined) {
    return '';
  }
  const actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key][map.value] == '' + value) {
      actions.push(datas[key][map.label]);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas: any, value: any, separator: any) {
  if (value === undefined) {
    return '';
  }
  const actions: any = [];
  const currentSeparator = undefined === separator ? ',' : separator;
  const temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    let match = false;
    Object.keys(datas).some((key) => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    });
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  });
  return actions.join('').substring(0, actions.join('').length - 1);
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id: any, parentId: any, children: any) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  const childrenListMap: any = {};
  const nodeIds: any = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 *  tree 根据最后一级 ID 查找所有父级节点
 * @param {*} list 数据源
 * @param {*} id 节点id
 */
export function find(list: any, id: any) {
  if (!list || !id) {
    return '';
  }
  const arr: any = [];
  const findParent = (data: any, nodeId: any, parentId?: any) => {
    for (let i = 0, length = data.length; i < length; i++) {
      const node = data[i];
      if (node.id === nodeId) {
        arr.unshift(data[i]);
        if (nodeId === list[0].id) {
          break;
        }
        findParent(list, parentId);
        break;
      } else {
        if (node.children) {
          findParent(node.children, nodeId, node.id);
        }
        continue;
      }
    }
    return arr;
  };
  return findParent(list, id);
}
