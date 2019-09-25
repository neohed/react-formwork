# React-Formwork  [![NPM version][npm-image]][npm-url]

**A ReactJS higher order component (HoC) to generate an HTML form from a Javascript object.**

#### Run Examples:

* ```git clone https://github.com/davesnotes/react-formwork.git```
* ```npm i```
* ```npm run demo```
* Navigate to: ```localhost:3014```

#### Using from npm:

* Install from npm:

`npm install --save react-formwork`
* Import into your code:

`import Formwork from 'react-formwork'` 
* Wrap a form component with the Formwork HoC:
```jsx harmony
class MyForm extends Component {
    render() {
        const { fields, submit, data } = this.props.formwork;
        return (
            <form>
                {fields}
                {submit}
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </form>
        )
    }
}

const model = {
    name: 'David',
    email: 'a@b.c',
    jobTitle: 'Developer'
};

export default Formwork(MyForm, {
    fields: model,
    data: model
});
```

In the example above we pass our JS object `model` to the `Formwork` HoC.  We pull the generated HTML form fields, the 
submit button and our bound data object from `props.formwork`

# API

### `Formwork(component, formDefinition)`

`Formwork` uses `formDefinition` to generate HTML form elements and associated onChange databind and onBlur validation 
events then pass an array of these form fields to `component`.

#### Arguments:
* `component` a `React.Component` class.
* `formDefinition` this is an Object containing these properties:
  - `[name]` (String) An optional name for the form definition; returned in props.formwork.
  - `fields` (Object|Array|String) This is either an object where the property names represent form fields or an array 
  of objects, each object defining a field or a string property name where the fields definition exists.
  - `[data]` (Object|String) Optionally supply an object with properties matching form field names containing data.
  - `[css]` (Object) Optional object containing CSS definitions or class names for the form elements.

#### `fields` (String)
* The name of an Array or Object definition to be found in `this.props.[<fields>]`

#### `fields` (Object)
In the simplest case a plain old Javascript object; each property, where hasOwnProperty is true, will be used to generate
 an HTML text input field. 

#### `fields` (Array)
In this case each array element will be an object defining a single form field.  Each Object may contain the following properties:
* `name` (String) The name of the form field.  If no `title` is supplied this will also be formatted for use as the title.
* `[title]` (String) The title displayed above the form input field.
* `[template]` (Function) Returns the HTML used to wrap the form Input.
* `[input]` (Function) Returns the HTML input control used.
* `[validator]` (Object) Defines custom validation.
* `[type]` (String) One of the HTML input types: `text`, `radio`, `select`, `password`, etc...
* `[*]` Any other properties, such as `data-id`, `aria-describedby`, etc., will be added to the input control.

#### CSS (Object)
Contains 5 optional fields which may be a string representing a CSS class name or an object representing a React inline 
CSS definition.
* `[fieldset]` (Object|String) CSS applied to the fieldset HTML element wrapping each form field.
* `[legend]` (Object|String) CSS applied to the legend HTML element containing the form field title.
* `[input]` (Object|String) CSS applied to the HTML input element.
* `[error]` (Object|String) CSS applied to the validation error label.
* `[submit]` (Object|String) CSS applied to the submit button.

#### `template` (Function)

Parameters:
* `labelText` (String) The form field label text as supplied in `Title` or generated from `name`
* `inputName` (String) The name of the input control as supplied in `name`
* `inputControl` This is the JSX input control.

***Returns***
* JSX

#### `input` (Function)
Used to define a custom input control.  Parameters:
* `type` (String) Type as supplied in the field definition.
* `inputName` (String) Name of the input control.
* `onChange` (Function) Expects a React synthetic event.
* `data` (String) Any data supplied from initial configuration.
* `css` (Object|String) A React CSS object definition or a string CSS class name.
* `additionalProperties` (Object) Any other properties supplied.

***Returns***
* JSX

#### `validator` (Object)
This object defines validation to be performed onBlur. It contains two fields:
* `validate` (Function) Receives a single parameter `value` (String) and returns a (Boolean)
* `message` (String) The error message to display. 

### `Formwork` injects these properties into the wrapped component, `this.props.formwork`

* `name` (String) The name of the form definition if one was supplied.
* `fields` (Array) The HTML form fields.
* `fieldsByName` (Object) A map of the HTML form fields indexed by `name`.
* `submit` An HTML submit button.
* `isFormValid` (Bool) A flag indicating the validation state of the entire form.

#### Example, accessing elements by name

In case you want to individually place the form fields:
```jsx harmony
class MyForm extends Component {
    render() {
        const { fieldsByName } = this.props.formwork;
        return (
            <form>
                <p>Name input:</p>
                {fieldsByName['name']}
                
                <p>Email input:</p>
                {fieldsByName['email']}
                
                <p>Job Title input:</p>
                {fieldsByName['jobTitle']}
            </form>
        )
    }
}
```
#### Example, custom titles

```jsx harmony
class MyForm extends Component {
    render() {
        const { fields } = this.props.formwork;
        return (
            <form>
                {fields}
            </form>
        )
    }
}

const model = {
    name: 'David',
    ISBN: '011010010101010'
};

export default Formwork(MyForm, {
    titles: { ISBN: 'ISBN'},
    fields: model,
    data: model
});
```
By default names will be split by capital letter and then capitalised.  When this doesn't work such as `ISBN` becoming `I S B N` you can supply a titles map.

#### Example, field definition and data located in Redux store:
```jsx harmony
export default connect(state => ({
    artist: state.records.artist
}))(Formwork(editMusicBrainz, {
    fields: 'artist',
    data:  'artist'
}));
```

#### Example, customising form elements
To fully customise the form fields instead of depending on default conventions, supply an array of objects to the `fields` property.
```jsx harmony
export default Formwork(MyForm, {
    fields: [
        {
            name: 'name',
            title: 'Given Name:',
            template: (labelText, inputName, inputControl) => <div key={inputName}
                                                                      style={{'border': '2px solid red'}}>
                <p>{labelText}</p><p>{inputName}</p><p>{inputControl}</p></div>,
            validator: {
                    validate: value => value.length > 2,
                    message: 'Length must be greater than 2 characters'
            }
        },
        {
            name: 'email',
            validator: 'name'
        },
        {
            name: 'jobTitle'
        },
        {
            name: 'nationalInsuranceNumber'
        },
        {
            name: 'heardOfUs',
            type: 'select',
            data: [
                { key: 1, value: 'Radio' },
                { key: 2, value: 'TV' },
                { key: 3, value: 'Web' }
            ]
        },
        {
            name: 'industry',
            type: 'radio',
            data: [
                { key: 1, value: 'IT' },
                { key: 2, value: 'Medical' },
                { key: 3, value: 'Leisure' }
            ]
        }
    ]
});
```
This example provides a custom HTML template to wrap the `name` HTML input.  It also provides a custom validator.  Note, the `email` field definition uses the string `name` as it's validator instead of an object, this tells Formwork to usethe previously defined validator from the `name` field definition.  This means you only ever have to define templates and validators one time and then reuse via string reference. 

#### Example, form validation
Formwork contains a boolean flag `isFormValid` that represents the validity state of the entire form.
```jsx harmony
class MyForm extends Component {
    onSubmit = e => {
        e.preventDefault();
        const {data, isFormValid} = this.props.formwork;
        if (isFormValid) {
            // Do something with `data`
        }
    };
    
    render() {
        const { fields, submit } = this.props.formwork;
        return (
            <form onSubmit={this.onSubmit}>
                {fields}
                {submit}
            </form>
        )
    }
}

export default Formwork(MyForm, {
    fields: [
        {
            name: 'email',
            validator: {
                validate: value => value.length > 2,
                message: 'Length must be greater than 2 characters'
            }
        }
    ]
});
```

#### Example, CSS
```jsx harmony
export default Formwork(FormCss, {
    fields: model,
    css: {
        fieldset: 'blue-background',
        legend: 'orange-background',
        input: 'green-background',
        error: {
            'backgroundColor': '#ff0000',
            'color': '#000'
        },
        submit: 'yellow-background'
    }
});
```

#### Example, arbitrary properties
Any additional properties added to a `field` definition will be added to the input control.
```jsx harmony
export default Formwork(MyForm, {
    fields: [
        {
            name: 'email',
            'data-entityId': '101',
            'aria-describedby': 'info'
        }
    ]
});
```
output:
```html
<input type="text" name="email" data-entityId="101" aria-describedby="info">
```

#### Testing

npm run test

#### Create dist build

npm run dist

#### ToDo

* Make it work recursively for complex objects with nested objects
* Export Redux stuff - reducers, etc, giving an out of the box Redux form (+ axios api's?)
* Export a "debug" component using pre tag and JSON.stringify (don't overlap with React devtools)
* Add functional tests for validation

[npm-url]: https://www.npmjs.com/package/react-formwork
[npm-image]: http://img.shields.io/npm/v/react-responsive.svg
