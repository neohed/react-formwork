import React from 'react';
import ReuseTemplate from './forms/reuseTemplateForm';
import renderer from 'react-test-renderer';

test('Render a form with a reused template', () => {
    const component = renderer.create(
        <ReuseTemplate />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    /*
    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    */
});
