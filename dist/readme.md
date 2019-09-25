# React-Formwork

**A ReactJS higher order component (HoC) to generate an HTML form from a Javascript object.**

#### Using:

* Install from npm:

`npm install --save react-formwork`
* Import:

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

In the example above we pass our JS object `model` to the `Formwork` HoC.  We pull the generated HTML form fields, the submit button and our bound data object from `props.formwork`

***For additional documentation visit the: [GitHub repo](https://github.com/davesnotes/react-formwork)***
