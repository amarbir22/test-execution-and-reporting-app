import React from 'react';
import { shallow } from 'enzyme';
import InputError from './InputError';

describe('Input Error', () => {
  let component;
  const props = {
    errors: {
      message: 'This is an error message'
    }
  };

  beforeEach(() => {
    component = shallow(<InputError errors={props.errors} />);
  });

  it('should render', () => {
    const wrapper = component.find('div.invalid-feedback');

    expect(wrapper.length)
      .toBe(1);
  });

  it('should display error test', () => {
    const wrapper = component.find('div.invalid-feedback');

    expect(wrapper.text())
      .toEqual(props.errors.message);
  });

  it('should not render if no errors props', () => {
    const noPropComponent = shallow(<InputError />);
    const wrapper = noPropComponent.find('div');

    expect(wrapper.length)
      .toBe(0);

    expect(noPropComponent).toEqual({});
  });
});
