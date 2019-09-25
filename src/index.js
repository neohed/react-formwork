import React, {Component} from 'react'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'

/**
 * @ComposedComponent The component to wrap and inject form properties into.
 * @config object containing for definition and data.
 * @return React component - a property: formwork will be added containing all form fields.
 */
export default function (ComposedComponent, config) {
    class Formwork extends Component {
        constructor(props) {
            super(props);

            this.state = {
                // A collection of user supplied templates.
                templates: {},

                // A collection of user supplied validation functions.
                validators: {},

                // The user supplied form configuration.
                form: this.normalizeConfig(config.data) || {},

                // A reference to the form data object used to determine if it has changed.
                _dataRef: null,

                // Form level validation flag.
                isFormValid: false
            };
        }

        /*
         * Determine if the config is a string in which case we look for that string key in props else we assume
         * the config is an object and use it directly.
         */
        normalizeConfig = keyOrConfig => isString(keyOrConfig) ? this.props[keyOrConfig] : keyOrConfig;

        /*
         * The supplied form fields can either be an object in which case the object properties define form fields or it will be an array
         * of objects where each object defines a form field.
         */
        normalizeFormworkFields = ({fields}) => {
            const formworkFields = this.normalizeConfig(fields) || [];

            return isArray(formworkFields)
                ? formworkFields
                : Object.keys(formworkFields).map(key => ({name: key}))
        };

        /*
         * Apply validation to form.
         */
        componentDidMount() {
            const formworkFields = this.normalizeFormworkFields(config);
            const validatorDefinitions = {};
            const validators = {};
            const {form} = this.state;
            let isFormValid = true;

            formworkFields.forEach(field => {
                const {name, validator} = field;

                let elementValidator;
                if (isObject(validator)) {
                    elementValidator = validator;
                    validatorDefinitions[name] = validator;
                } else if (isString(validator)) {
                    elementValidator = validatorDefinitions[validator];
                } else {
                    elementValidator = {validate: () => true, message: ''};
                }

                const isValid = elementValidator.validate(form[name] || '');
                isFormValid = isFormValid && isValid;

                validators[name] = {
                    ...elementValidator,
                    isValid,
                    isTouched: false,
                    isActive: false
                };
            });

            this.setState({validators, isFormValid});
        }

        /*
         * Validate entire form.
         */
        validateForm = () => {
            const formworkFields = this.normalizeFormworkFields(config);
            const {validators, form} = this.state;
            const newValidators = {};
            let isFormValid = true;

            formworkFields.forEach(field => {
                const {name} = field;
                const value = form[name];
                const validator = validators[name];
                if (validator !== undefined) {
                    const {validate} = validator;
                    const isValid = validate(value);
                    isFormValid = isFormValid && isValid;
                    newValidators[name] = {
                        ...validator,
                        isValid
                    };
                }
            });

            this.setState({validators: newValidators, isFormValid});
        };

        /*
         * Determine if the supplied data object has changed and if so store it in state then apply validation.
         */
        componentDidUpdate() {
            if (isString(config.data)) { // We are loading data via Redux.
                const form = this.props[config.data];
                const {_dataRef} = this.state;

                if (_dataRef !== form) {
                    this.setState({form: {...form}, _dataRef: form}, () => this.validateForm());
                }
            }
        }

        /*
         * Render form field title.
         */
        titleFromName(name) {
            if (name === undefined || name === '') {
                return '';
            }

            return name.split(/(?=[A-Z])|\s/).map(s => capitalize(s)).join(' ');
        }

        /*
         * Form field css is either an object of CSS styles or a string representing a CSS classname.
         */
        elementCss = style => {
            if (isObject(style)) {
                return {style};
            }

            if (isString(style)) {
                return {className: style};
            }

            return {};
        };

        /*
         * Validation for a single form field.
         */
        validate = (name, value) => {
            const stateValidators = this.state.validators;
            const validator = stateValidators[name];
            const {validate} = validator;
            const validators = {
                ...stateValidators,
                [name]: {
                    ...validator,
                    isValid: validate(value),
                    isTouched: true
                }
            };
            let isFormValid = true;
            Object.values(validators).forEach(v => isFormValid = isFormValid && v.isValid);

            this.setState({validators, isFormValid});
        };

        /*
         * Perform validation on a form field when it loses focus.
         */
        onBlur = e => {
            const {name, value} = e.target;
            this.validate(name, value);
        };

        /*
         * When a form field changes perform validation if that field has previously been edited.
         */
        onChange = e => {
            const {name, value} = e.target;
            const form = {...this.state.form, [name]: value};
            const {isTouched} = this.state.validators[name];
            this.setState({form}, () => {
                if (isTouched) {
                    this.validate(name, value);
                }
            });
        };

        /*
         * Render error message if one is defined and the form field has failed validation.
         */
        validationLabel = (name, errorCss, infoCss) => {
            const {isTouched, isActive, isValid, message} = this.state.validators[name] || {};
            if ((!isActive && !isTouched) || isValid || message === undefined || message.length === 0) {
                return '';
            }

            const labelCss = isTouched ? errorCss : infoCss;

            return <label {...labelCss}>{message}</label>;
        };

        /*
         * The default form field render template.
         */
        defaultTemplate = () => (inputTitle, inputName, inputControl, fieldCss = {}, errorCss = {}, infoCss = {}) => {
            return <div key={inputName} {...fieldCss}>
                <label htmlFor={inputName}>{inputTitle}</label>
                {inputControl}
                {this.validationLabel(inputName, errorCss, infoCss)}
            </div>
        };

        /*
         * The default form field input controls.
         */
        defaultInput = () => (type, inputName, onChange, data, css, additionalProperties) => {
            const value = this.state.form[inputName] || '';

            switch (type) {
                case 'select':
                    return <select name={inputName} onChange={onChange}
                                   defaultValue={value || -1} {...css} {...additionalProperties}>
                        {value === undefined ? <option value={-1} disabled hidden/> : ''}
                        {data.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
                    </select>;
                case 'radio':
                    return <ul style={{listStyleType: 'none'}}>
                        {data.map(option => [
                            <li key={option.key}>
                                <input type="radio" name={inputName} onChange={onChange}
                                   value={option.key} {...additionalProperties}/> {option.value}
                            </li>
                        ])}
                    </ul>;
                default:
                    return <input type={type} name={inputName} onBlur={this.onBlur} onChange={onChange}
                                  value={value} {...css} {...additionalProperties}/>;
            }
        };

        /*
         * Generate form.
         */
        generate() {
            const {titles = {}, css = {}} = config;
            const formworkFields = this.normalizeFormworkFields(config);
            const {templates} = this.state;
            const templateDefinitions = {};
            const fields = [];
            const fieldsByName = {};

            formworkFields.forEach(field => {
                const {
                    name,
                    template,
                    type = 'text',
                    input = this.defaultInput(),
                    title = titles[name] || this.titleFromName(name),
                    ...rest
                } = field;

                delete rest.validator;
                let formElement;

                if (templates[type] !== undefined) {
                    const v = this.state.form[name] || '';
                    formElement = <div key={name}>{templates[type](title, name, this.onChange, v)}</div>
                } else {
                    let generateTemplate;
                    if (isFunction(template)) {
                        generateTemplate = template;
                        templateDefinitions[name] = template;
                    } else if (isString(template)) {
                        generateTemplate = templateDefinitions[template];
                    } else {
                        generateTemplate = this.defaultTemplate();
                    }

                    formElement = generateTemplate(
                        title,
                        name,
                        input(type, name, this.onChange, field.data, this.elementCss(css.input), rest),
                        this.elementCss(css.fieldset),
                        this.elementCss(css.legend),
                        this.elementCss(css.error));
                }

                fields.push(formElement);
                fieldsByName[name] = formElement;
            });

            return {
                // An array of form fields.
                fields,

                // An object mapping form fields by name.
                fieldsByName,

                // A submit button.
                submit: <button type="submit" disabled={!this.state.isFormValid} {...this.elementCss(css.submit)}>
                    Submit</button>
            };
        }

        render() {
            return <ComposedComponent {...this.props} formwork={{
                ...this.generate(),
                data: this.state.form,
                isFormValid: this.state.isFormValid,
                name: config.name || ''
            }}/>
        }
    }

    return Formwork;
}
