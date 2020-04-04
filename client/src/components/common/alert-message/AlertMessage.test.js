import React from 'react';
import { shallow, render, mount } from 'enzyme';

import AlertMessage from './AlertMessage';


describe('Alert Message', () => {
  let component;

  const props = {
    alertHeading: 'this is a title',
    alertMessage: 'This is a message',
    alertVariant: 'success'
  };

  beforeEach(() => {
    component = shallow(<AlertMessage
      alertHeading={props.alertHeading}
      alertMessage={props.alertMessage}
      alertVariant={props.alertVariant}
    />);
  });

  it('should render the Alert Component correctly', () => {
    const wrapper = component.find('.alertMsg');
    expect(wrapper.length)
      .toBe(1);
  });

  it('should render alert message correctly', () => {
    const wrapper = component.find('AlertHeading');
    expect(wrapper.text())
      .toEqual(props.alertHeading);
  });

  it('should render alert title correctly', () => {
    const wrapper = component.find('Alert')
      .childAt(1);
    expect(wrapper.text())
      .toEqual(props.alertMessage);
  });

  it('should have close button', () => {
    const renderedComponent = render(<AlertMessage
      alertMessage={props.alertMessage}
      alertVariant="success"
    />);
    const wrapper = renderedComponent.find('button.close');
    expect(wrapper.length)
      .toBe(1);
  });

  it('should close', () => {
    const mountComponent = mount(<AlertMessage
      alertMessage={props.alertMessage}
      alertVariant="success"
    />);
    const button = mountComponent.find('button.close');
    button.simulate('click');

    const wrapper = mountComponent.find('.alertMsg');
    expect(wrapper)
      .toEqual({});
  });
});
