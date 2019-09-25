import React from 'react';
import SimpleForm from './forms/simpleForm';
import renderer from 'react-test-renderer';

test('Test a simple render', () => {
    const component = renderer.create(
        <SimpleForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
