import React from 'react';
import { shallow, render, mount } from 'enzyme';

import AlertMessage from './AlertMessage';


describe('Alert Message', () => {
  const msg = 'This is a message';
  const heading = 'this is a title';
  const alertWithMessage = shallow(<AlertMessage alertMessage={msg} alertVariant="success" />);
  const alertWithMessageAndHeading = shallow(<AlertMessage alertHeading={heading} alertMessage={msg} alertVariant="success" />);


  it('should render the Alert Component correctly', () => {
    const wrapper = alertWithMessage.find('.alertMsg');
    expect(wrapper.length)
      .toBe(1);
  });

  it('should render alert message correctly', () => {
    const wrapper = alertWithMessageAndHeading.find('AlertHeading');
    expect(wrapper.text()).toEqual(heading);
  });

  it('should render alert title correctly', () => {
    const wrapper = alertWithMessageAndHeading.find('Alert').childAt(1);
    expect(wrapper.text()).toEqual(msg);
  });

  it('should have close button', () => {
    const component = render(<AlertMessage alertMessage={msg} alertVariant="success" />);
    const wrapper = component.find('button.close');
    expect(wrapper.length).toBe(1);
  });

  it('should close', () => {
    const component = mount(<AlertMessage alertMessage={msg} alertVariant="success" />);
    const button = component.find('button.close');
    button.simulate('click');

    const wrapper = component.find('.alertMsg');
    expect(wrapper)
      .toEqual({});
  });
});
