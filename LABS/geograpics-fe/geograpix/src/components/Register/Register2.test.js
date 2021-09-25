import React from 'react';
import { shallow } from 'enzyme';
import { Register2 } from './Register2';


describe('Register2 Component', () => {
    
    test("Mounts", () => {
        const wrapper = shallow(<Register2 />);
        expect(wrapper.exists()).toBe(true);
    })

    test("HandleChange functionality works", () => {
        const wrapper = shallow(<Register2 onChangeHandler={() => {}} />);
        wrapper.find("#email").simulate("change", {
            target: {value: "hello"}
        })
        expect(wrapper.find("#email").props().value).toEqual("hello")
    })

})