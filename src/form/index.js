import React, { createContext, useContext, useState } from "react";

const FormCollectionContext = createContext();

export function FormCollectionProvider({ children }) {
    const [forms, setForms] = useState({});

    // Register a form with initial values
    const registerForm = (formName, initialValues = {}) => {
        setForms(prev => ({
            ...prev,
            [formName]: { ...initialValues }
        }));
    };

    // Update a field in a form
    const setFieldValue = (formName, field, value) => {
        setForms(prev => ({
            ...prev,
            [formName]: {
                ...prev[formName],
                [field]: value
            }
        }));
    };

    // Get all values for a form
    const getFormValues = (formName) => forms[formName] || {};

    // Reset a form
    const resetForm = (formName) => {
        setForms(prev => ({
            ...prev,
            [formName]: {}
        }));
    };

    return (
        <FormCollectionContext.Provider value={{
            registerForm,
            setFieldValue,
            getFormValues,
            resetForm
        }}>
            {children}
        </FormCollectionContext.Provider>
    );
}

export function useForm(formName, initialValues = {}) {
    const ctx = useContext(FormCollectionContext);

    // Register form on first use
    React.useEffect(() => {
        ctx.registerForm(formName, initialValues);
        // eslint-disable-next-line
    }, []);

    const values = ctx.getFormValues(formName);

    // Handler for input fields
    const handleChange = (field) => (e) => {
        ctx.setFieldValue(formName, field, e.target.value);
    };

    // Handler for array fields (like ingredients)
    const handleArrayChange = (field, idx) => (e) => {
        const arr = [...(values[field] || [])];
        arr[idx] = e.target.value;
        ctx.setFieldValue(formName, field, arr);
    };

    // Add item to array field
    const handleArrayAdd = (field, defaultValue = "") => () => {
        const arr = [...(values[field] || [])];
        ctx.setFieldValue(formName, field, arr);
    };

    // Remove item from array field
    const handleArrayRemove = (field, idx) => () => {
        const arr = [...(values[field] || [])];
        arr.splice(idx, 1);
        ctx.setFieldValue(formName, field, arr);
    };

    return {
        values,
        handleChange,
        handleArrayChange,
        handleArrayAdd,
        handleArrayRemove,
        reset: () => ctx.resetForm(formName)
    };
}