import React from 'react';
import CssForm from './forms/complexForm';
import renderer from 'react-test-renderer';

test('Render a form with CSS styles and custom attributes', () => {
    const component = renderer.create(
        <CssForm />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
