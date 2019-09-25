import React from 'react';
import CustomTitleForm from './forms/customTitleForm';
import renderer from 'react-test-renderer';

test('Test a form with custom form field titles', () => {
    const component = renderer.create(
        <CustomTitleForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
