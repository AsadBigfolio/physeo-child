"use client"
import React, { useMemo, useReducer } from 'react';
import TextAreaInput from '../InputFields/TextAreaInput';
import TextInput from '../InputFields/Textinput';
import { trpc } from '@/utils/trpcClient';
import Button from '../UI/Button';
import toast, { Toaster } from 'react-hot-toast';
import { safeJSONParse } from '@/utils/jsonParse';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'RESET_FORM':
      return {
        initialState
      };
    default:
      return state;
  }
};

const ContactForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { data, mutate, error, isPending } = trpc.contactUs.sendMessage.useMutation({
    onSuccess: () => {
      toast.success('Message sent successfully.')
    }
  })

  const handleChange = (e) => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(state)
    dispatch({ type: 'RESET_FORM' });
  };
  const formattedErrors = useMemo(() => {
    return (
      safeJSONParse(error?.message)?.reduce((acc, error) => {
        acc[error.path.join("_")] = error.message;
        return acc;
      }, {}) || {}
    );
  }, [error]);

  return (
    <div className="flex flex-col gap-y-[-10px] ">
      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder={"Name"}
          label={"Name"}
          inputClasses={"bg-white border-[#A197EC80]"}
          error={formattedErrors.name}
        />

        <div className='grid grid-cols-2 gap-5'>
          <TextInput
            name="email"
            value={state.email}
            type='email'
            onChange={handleChange}
            placeholder={"Email"}
            label={"Email"}
            inputClasses={"bg-white border-[#A197EC80]"}
            error={formattedErrors.email}
          />
          <TextInput
            name="phone"
            type='number'
            value={state.phone}
            onChange={handleChange}
            placeholder={"Contact Number"}
            label={"Contact Number"}
            inputClasses={"bg-white border-[#A197EC80]"}
            error={formattedErrors.phone}
          />
        </div>

        <TextAreaInput
          name="message"
          value={state.message}
          onChange={handleChange}
          placeholder={"Message"}
          label={"Message"}
          inputClasses={"bg-white border-[#A197EC80] h-[215px]"}
          error={formattedErrors.message}
        />

        <Button
          type="submit"
          loading={isPending}
          className="w-full py-6"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
