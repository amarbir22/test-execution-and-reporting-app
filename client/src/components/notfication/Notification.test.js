import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notification';


describe('Notification', () => {
  const component = shallow(<Notification />);

  it('should render', () => {
    const wrapper = component.find('#notifications');
    expect(wrapper.length)
      .toBe(1);
  });

  it('should have alert message', () => {
    const wrapper = component.find('AlertMessage');
    expect(wrapper.length)
      .toBe(1);
  });
});
