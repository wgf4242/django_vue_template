import {test} from 'vitest';
import {mount} from '@vue/test-utils';
import Hei from './Hei';


test("hei", () => {
  console.log('----------------------');
  console.log(Hei.setup?.toString());
  
  
  const wrapper = mount(Hei);
  expect(wrapper.text()).toContain("hei")
  // 默认识别为ssr环境， Cannot read properties of undefined (reading 'modules')
})