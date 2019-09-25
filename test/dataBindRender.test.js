import React from 'react';
import DataBindForm from './forms/dataBindForm';
import renderer from 'react-test-renderer';

test('Render a form with data binding', () => {
    const component = renderer.create(
        <DataBindForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
