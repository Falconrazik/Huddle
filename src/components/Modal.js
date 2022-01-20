import React from "react";
import { ModalContext } from "..";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createHuddle } from "../common/queries";
import { gql, useMutation } from "@apollo/client";
import { MeContext } from "../common/contexts/me.context";
import { HUDDLE_COLORS } from "../common/colors";

export const Modal = ({ showModal, setShowModal }) => {
  const [createNewHuddle, { data }] = useMutation(gql(createHuddle));
  const { setIsModalOpen, i } = React.useContext(ModalContext);
  const { me } = React.useContext(MeContext);

  const createHuddleSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your Huddle name"),
    description: Yup.string().required("Please enter your description"),
    min: Yup.number().min(5, "Minimum numbers of member is 5").required(),
    max: Yup.number().max(32, "Maximum numbers of member is 32").required(),
  });

  const formik = useFormik({
    validationSchema: createHuddleSchema,
    initialValues: {
      creator: "",
      name: "",
      description: "",
      min: "",
      max: "",
    },
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        // do api stuff here
        await createNewHuddle({
          variables: {
            input: {
              creator: me.id,
              name: values.name,
              description: values.description,
              min: values.min,
              max: values.max,
            },
          },
        });
      } catch {
        alert("Oops something went wrong");
      }
      setIsModalOpen(false);
      actions.setSubmitting(false);
    },
  });

  React.useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <div
      className="flex-col items-center content-center p-10 rounded-xl bg-gray-300"
      style={{ backgroundColor: HUDDLE_COLORS.skinColor }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Huddle Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="ACM"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="description"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              rows="4"
              cols="50"
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="min"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Min
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              min="5"
              max="32"
              step="1"
              placeholder="5"
              name="min"
              value={formik.values.min}
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="max"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Max
            </label>
            <div className="relative">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                min="5"
                max="32"
                step="1"
                placeholder="10"
                name="max"
                value={formik.values.max}
                onChange={formik.handleChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Create Huddle
        </button>
      </form>
    </div>
  );
};

export default Modal;
