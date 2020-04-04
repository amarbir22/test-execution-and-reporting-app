import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should render', () => {
    const component = shallow(<NotFound />);
    const wrapper = component.find('div.not-found');

    expect(wrapper.length).toBe(1);
  });
});
