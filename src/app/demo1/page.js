"use client";
import {
  Accordion,
  Avatar,
  Button,
  Badge,
  Card,
  Collapse,
  Dropdown,
  Modal,
  Pagination,
  Scrollspy,
  Stepper,
  Tabs,
  InputCheckbox,
  InputFile,
  InputImage,
  InputText,
  InputRadio,
  Select,
  Switch,
  TextArea,
} from "@/components/atoms";
import Tooltip from "@/components/atoms/Tooltip";

import { Fragment, useState } from "react";

const tabsData = [
  { label: "Overview", content: <p>This is the overview content.</p> },
  { label: "Details", content: <p>This is the details content.</p> },
  { label: "Reviews", content: <p>This is the reviews content.</p> },
];
const optionValue = [
  { label: "Indonesia", value: "Indonesia" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Singapore", value: "Singapore" },
  { label: "Thailand", value: "Thailand" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Laos", value: "Laos" },
  { label: "Philippines", value: "Philippines" },
  { label: "Brunei", value: "Brunei" },
];

// Sample data for Accordion
const accordionItems = [
  {
    title: "What is the refund policy?",
    content:
      "Our refund policy allows for a full refund within 30 days of purchase.",
  },
  {
    title: "How do I reset my password?",
    content:
      "To reset your password, click on 'Forgot Password' on the login screen and follow the instructions.",
  },
  {
    title: "Can I upgrade my subscription later?",
    content:
      "Yes, you can upgrade your subscription at any time through your account settings.",
  },
];

export default function Demo1() {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);
  const [isChecked, setIsChecked] = useState({
    first: false,
    secondary: false,
    small: false,
    default: false,
    large: false,
  });

  const [isRadioChecked, setIsRadioChecked] = useState({
    first: false,
    secondary: false,
    small: false,
    default: false,
    large: false,
  });

  const [isSwitchChecked, setIsSwitchChecked] = useState({
    first: false,
    secondary: false,
    small: false,
    default: false,
    large: false,
  });

  const handleCheckboxChange = (property, checked) => {
    setIsChecked({
      ...isChecked,
      [property]: checked,
    });
  };

  const handleRadioChange = (property) => {
    setIsRadioChecked((prevState) =>
      Object.keys(prevState).reduce((newState, key) => {
        newState[key] = key === property; // Set only the selected key to true
        return newState;
      }, {})
    );
  };

  const handleSwitchChange = (property, checked) => {
    setIsSwitchChecked({
      ...isSwitchChecked,
      [property]: checked,
    });
  };

  return (
    <Fragment>
      <div className="bg-white">
        <h1 className="text-2xl font-bold shadow-lg px-10 py-8">
          Demo of Components
        </h1>
        <div className="px-8 pt-4">
          <div className=" max-h-[800px] overflow-auto">
            {/* Accordion Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">FAQs</h2>
              <div className="rounded-lg border border-gray-300 p-5">
                <Accordion items={accordionItems} defaultOpenIndex={0} />
              </div>
            </section>

            {/* Avatar Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">User Avatars</h2>
              <div className="flex gap-4">
                <Avatar
                  src="/media/avatars/300-1.png"
                  size="20"
                  status="success"
                />
                <Avatar
                  initial="A"
                  size="20"
                  bgColor="bg-info-light"
                  textColor="text-info"
                  borderColor="border-info-clarity"
                  status="success"
                />
                <Avatar
                  src="/media/avatars/300-4.png"
                  size="20"
                  status="gray"
                />
                <Avatar
                  initial="B"
                  size="20"
                  bgColor="bg-danger-light"
                  textColor="text-danger"
                  borderColor="border-danger-clarity"
                  status="gray"
                />
              </div>
            </section>
            {/* Button Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Actions Button</h2>
              <div className="flex gap-4">
                <Button
                  text="Primary Action"
                  appearance="primary"
                  type="outline"
                  onClick={() => alert("Primary button clicked!")}
                />
                <Button
                  text="Success Action"
                  appearance="success"
                  type="clear"
                  onClick={() => alert("Success button clicked!")}
                />
                <Button
                  text="Danger Action"
                  appearance="danger"
                  icon={"ki-outline ki-plus-squared"}
                  onClick={() => alert("Danger button clicked!")}
                />
              </div>
            </section>
            {/* Badge Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Badge</h2>
              <div className="flex gap-4">
                <Badge text="Default Badge" appearance="primary" />
                <Badge
                  text="Badge Outline"
                  appearance="success"
                  type="outline"
                />
                <Badge text="Badge Pill" appearance="danger" type="pill" />
              </div>
            </section>
            {/* Card Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Cards</h2>
              <div className="flex w-[800px]">
                <Card
                  styleHeader={"justify-center"}
                  contentHeader={<p className="font-semibold">Card Title</p>}
                  styleFooter={"justify-center"}
                  contentFooter={
                    <a
                      href="https://example.com"
                      className="underline text-cyan-600"
                    >
                      Example Link
                    </a>
                  }
                >
                  <p>
                    Centralize your team information with our management tools.
                    Access detailed instructions, expert advice, and technical
                    documentation to maintain an up-to-date team directory.
                  </p>
                </Card>
              </div>
              <div className="flex mt-5 w-[800px]">
                <Card>
                  <p>
                    Centralize your team information with our management tools.
                    Access detailed instructions, expert advice, and technical
                    documentation to maintain an up-to-date team directory.
                  </p>
                </Card>
              </div>
            </section>
            {/* Collapse Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Collapse</h2>
              <div className="flex w-[800px]">
                <Collapse />
              </div>
            </section>
            {/* Dropdown Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Dropdown</h2>
              <div className="flex w-[800px]">
                <Dropdown />
              </div>
            </section>
            {/* Modal Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Modal</h2>
              <div className="flex w-[800px]">
                <div className="flex justify-between gap-4">
                  <div className="dropdown">
                    <Button
                      className={"dropdown-toggle"}
                      text="Show Modal"
                      appearance="primary"
                      onClick={() => setOpenModal(true)}
                    />
                    <Modal
                      showModal={openModal}
                      title="Test Modal Title"
                      handleClose={() => setOpenModal(false)}
                      handleSubmit={() => console.log("Modal Submitted")}
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Tooltip Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Tooltip</h2>
              <div className="flex w-[800px]">
                <Tooltip />
              </div>
            </section>
            {/* Pagination Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Pagination</h2>
              <div className="flex w-[800px]">
                <Pagination
                  totalPage={10}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </section>
            {/* Scrollspy Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Scrollspy</h2>
              <div className="flex w-[800px]">
                <Scrollspy />
              </div>
            </section>
            {/* Stepper Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Stepper</h2>
              <div className="flex w-[800px]">
                <Stepper />
              </div>
            </section>
            {/* Tabs Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Tabs</h2>
              <div className="flex w-[800px]">
                <Tabs tabs={tabsData} />
              </div>
            </section>
            {/* Input Checkbox Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Input Checkbox</h2>
              <div className="flex w-[800px] gap-4">
                <InputCheckbox
                  label="Single Checkbox"
                  checked={isChecked?.first}
                  onChange={() =>
                    handleCheckboxChange("first", !isChecked?.first)
                  }
                  className="max-w-md"
                />
                <InputCheckbox
                  label="Secondary Checkbox"
                  checked={isChecked?.secondary}
                  onChange={() =>
                    handleCheckboxChange("secondary", !isChecked?.secondary)
                  }
                  className="max-w-md"
                />
                <InputCheckbox
                  label="Disabled Checkbox"
                  className="max-w-md"
                  isDisabled={true}
                />
                <InputCheckbox
                  label="Checked & Disabled Checkbox"
                  className="max-w-md"
                  checked={true}
                  isDisabled={true}
                />
              </div>
              <div className="flex w-[800px] gap-4 mt-5">
                <InputCheckbox
                  label="Small Checkbox"
                  checked={isChecked?.small}
                  size={"sm"}
                  onChange={() =>
                    handleCheckboxChange("small", !isChecked?.small)
                  }
                  className="max-w-md"
                />
                <InputCheckbox
                  label="Default Checkbox"
                  checked={isChecked?.default}
                  onChange={() =>
                    handleCheckboxChange("default", !isChecked?.default)
                  }
                  className="max-w-md"
                />
                <InputCheckbox
                  label="Large Checkbox"
                  checked={isChecked?.large}
                  size={"lg"}
                  onChange={() =>
                    handleCheckboxChange("large", !isChecked?.large)
                  }
                  className="max-w-md"
                />
              </div>
            </section>
            {/* Input File Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Input File</h2>
              <div className="flex w-[1000px] gap-4">
                <InputFile
                  label="File Input"
                  className="max-w-md"
                  onChange={() => console.log("File Input")}
                />
                <InputFile
                  label="File Input Multiple"
                  className="max-w-md"
                  isMultiple={true}
                  onChange={() => console.log("File Input Multiple")}
                />
                <InputFile
                  label="File Input Disabled"
                  className="max-w-md"
                  isDisabled={true}
                />
              </div>
              <div className="flex w-[1000px] gap-4 mt-5">
                <InputFile
                  label="File Input Small"
                  size={"sm"}
                  className="max-w-md"
                  onChange={() => console.log("File Input Small")}
                />
                <InputFile
                  label="File Input Default"
                  className="max-w-md"
                  onChange={() => console.log("File Input Default")}
                />
                <InputFile
                  label="File Input Large"
                  size={"lg"}
                  className="max-w-md"
                  onChange={() => console.log("File Input Large")}
                />
              </div>
              <div className="flex w-[1000px] gap-4 mt-5">
                <InputFile
                  label="File Input Border Danger"
                  border={"danger"}
                  className="max-w-md"
                  onChange={() => console.log("File Input Border Danger")}
                />
                <InputFile
                  label="File Input Border Default"
                  className="max-w-md"
                  onChange={() => console.log("File Input Border Default")}
                />
                <InputFile
                  label="File Input Border Success"
                  border={"success"}
                  className="max-w-md"
                  onChange={() => console.log("File Input Border Success")}
                />
              </div>
            </section>
            {/* Input Image Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Input Image</h2>
              <div className="flex w-[1000px] gap-4">
                <InputImage
                  className="max-w-md"
                  onChange={() => console.log("Input Image")}
                />
                <InputImage className="max-w-md" isDisabled={true} />
              </div>
            </section>
            {/* Input Text Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Input Text</h2>
              <p className="text-sm font-semibold my-4">
                Input Text Formatting
              </p>
              <div className="flex w-[1000px] gap-2">
                <InputText
                  label="Text Input"
                  type="text"
                  placeholder={"Masukkan Text"}
                  className="w-80"
                  onChange={() => console.log("Text Input")}
                />
                <InputText
                  label="Text Input Required"
                  type="text"
                  placeholder={"Masukkan Text"}
                  required={true}
                  className="w-80"
                  onChange={() => console.log("Text Input Required")}
                />
                <InputText
                  label="Text Input Disabled"
                  type="text"
                  placeholder={"Masukkan Text"}
                  isDisabled={true}
                  className="w-80"
                  onChange={() => console.log("Text Input Disabled")}
                />
              </div>
              <p className="text-sm font-semibold my-4">Input Text Bordered</p>
              <div className="flex w-[1000px] gap-2 mt-4">
                <InputText
                  label="Input Border Default"
                  type="text"
                  placeholder={"Masukkan Text"}
                  className="w-80"
                  onChange={() => console.log("Input Border Default")}
                />
                <InputText
                  label="Input Border Danger"
                  type="text"
                  placeholder={"Masukkan Text"}
                  border={"danger"}
                  className="w-80"
                  onChange={() => console.log("Input Border Danger")}
                />
                <InputText
                  label="Input Border Success"
                  type="text"
                  placeholder={"Masukkan Text"}
                  border={"success"}
                  className="w-80"
                  onChange={() => console.log("Input Border Success")}
                />
              </div>
              <p className="text-sm font-semibold my-4">Input Text Type</p>
              <div className="flex w-[1000px] gap-2 mt-4">
                <InputText
                  label="Input Email"
                  type="email"
                  placeholder={"Masukkan Email"}
                  className="w-80"
                  onChange={() => console.log("Input Email")}
                />
                <InputText
                  label="Input Password"
                  type="password"
                  placeholder={"Masukkan Password"}
                  className="w-80"
                  onChange={() => console.log("Input Password")}
                />
                <InputText
                  label="Input Number"
                  type="number"
                  placeholder={"Masukkan Number"}
                  className="w-80"
                  onChange={() => console.log("Input Number")}
                />
              </div>
              <p className="text-sm font-semibold my-4">Input Text Size</p>
              <div className="flex w-[1000px] gap-2 mt-4">
                <InputText
                  label="Input Text Small"
                  type="text"
                  size={"sm"}
                  placeholder={"Masukkan Text"}
                  className="w-80"
                  onChange={() => console.log("Input Text")}
                />
                <InputText
                  label="Input Text Default"
                  type="text"
                  placeholder={"Masukkan Text"}
                  className="w-80"
                  onChange={() => console.log("Input Text")}
                />
                <InputText
                  label="Input Text Large"
                  type="text"
                  size={"lg"}
                  placeholder={"Masukkan Text"}
                  className="w-80"
                  onChange={() => console.log("Input Text")}
                />
              </div>
            </section>
            {/* Input Radio Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Input Radio</h2>
              <div className="flex w-[800px] gap-4">
                <InputRadio
                  label="Single Radio"
                  name={"radio"}
                  value={"first"}
                  checked={isRadioChecked?.first}
                  onChange={() =>
                    handleRadioChange("first", !isRadioChecked?.first)
                  }
                  className="max-w-md"
                />
                <InputRadio
                  label="Secondary Radio"
                  name={"radio"}
                  value={"secondary"}
                  checked={isRadioChecked?.secondary}
                  onChange={() =>
                    handleRadioChange("secondary", !isRadioChecked?.secondary)
                  }
                  className="max-w-md"
                />
                <InputRadio
                  label="Disabled Radio"
                  name={"radio"}
                  className="max-w-md"
                  isDisabled={true}
                />
                <InputRadio
                  label="Checked & Disabled Radio"
                  name={"radio"}
                  className="max-w-md"
                  checked={true}
                  isDisabled={true}
                />
              </div>
              <div className="flex w-[800px] gap-4 mt-5">
                <InputRadio
                  label="Small Radio"
                  name={"radio"}
                  value={"small"}
                  checked={isRadioChecked?.small}
                  size={"sm"}
                  onChange={() =>
                    handleRadioChange("small", !isRadioChecked?.small)
                  }
                  className="max-w-md"
                />
                <InputRadio
                  label="Default Radio"
                  name={"radio"}
                  value={"default"}
                  checked={isRadioChecked?.default}
                  onChange={() =>
                    handleRadioChange("default", !isRadioChecked?.default)
                  }
                  className="max-w-md"
                />
                <InputRadio
                  label="Large Radio"
                  name={"radio"}
                  value={"large"}
                  size={"lg"}
                  checked={isRadioChecked?.large}
                  onChange={() =>
                    handleRadioChange("large", !isRadioChecked?.large)
                  }
                  className="max-w-md"
                />
              </div>
            </section>
            {/* Select Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Select</h2>
              <div className="flex w-[1000px] gap-4">
                <Select
                  label="Single Select"
                  className="w-80"
                  optionValue={optionValue}
                />
                <Select
                  label="Secondary Select"
                  required={true}
                  className="w-80"
                  optionValue={optionValue}
                />
                <Select
                  optionValue={optionValue}
                  value={"Myanmar"}
                  label="Disabled Select"
                  className="w-80"
                  isDisabled={true}
                />
              </div>
              <div className="flex w-[1000px] gap-4 mt-4">
                <Select
                  label="Select Small"
                  className="w-80"
                  size={"sm"}
                  optionValue={optionValue}
                />
                <Select
                  label="Select Default"
                  className="w-80"
                  optionValue={optionValue}
                />
                <Select
                  label="Select Large"
                  className="w-80"
                  size={"lg"}
                  optionValue={optionValue}
                />
              </div>
            </section>
            {/* Switch Section */}
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Switch</h2>
              <div className="flex w-[800px] gap-4">
                <Switch
                  label="Single Switch"
                  checked={isSwitchChecked?.first}
                  onChange={() =>
                    handleSwitchChange("first", !isSwitchChecked?.first)
                  }
                  className="w-80"
                />
                <Switch
                  label="Secondary Switch"
                  checked={isSwitchChecked?.secondary}
                  onChange={() =>
                    handleSwitchChange("secondary", !isSwitchChecked?.secondary)
                  }
                  className="w-80"
                />
                <Switch
                  label="Disabled Switch"
                  className="w-80"
                  isDisabled={true}
                />
                <Switch
                  label="Checked & Disabled Switch"
                  className="w-80"
                  checked={true}
                  isDisabled={true}
                />
              </div>
              <div className="flex w-[800px] gap-4 mt-5">
                <Switch
                  label="Small Switch"
                  checked={isSwitchChecked?.small}
                  size={"sm"}
                  onChange={() =>
                    handleSwitchChange("small", !isSwitchChecked?.small)
                  }
                  className="w-80"
                />
                <Switch
                  label="Default Switch"
                  checked={isSwitchChecked?.default}
                  onChange={() =>
                    handleSwitchChange("default", !isSwitchChecked?.default)
                  }
                  className="w-80"
                />
                <Switch
                  label="Large Switch"
                  checked={isSwitchChecked?.large}
                  size={"lg"}
                  onChange={() =>
                    handleSwitchChange("large", !isSwitchChecked?.large)
                  }
                  className="w-80"
                />
              </div>
            </section>
            <section className="mb-8 border-2 p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Text Area</h2>
              <div className="flex w-[1000px] gap-2 mt-2">
                <TextArea
                  label="TextArea"
                  placeholder={"Masukkan Text"}
                  className="w-[400px]"
                  rows={4}
                  onChange={() => console.log("Text Input")}
                />
                <TextArea
                  label="TextArea Border Danger"
                  placeholder={"Masukkan Text"}
                  className="w-[400px]"
                  rows={4}
                  border={"danger"}
                  onChange={() => console.log("Text Input")}
                />
              </div>
              <div className="flex w-[1000px] gap-2 mt-2">
                <TextArea
                  label="TextArea Required"
                  type="text"
                  placeholder={"Masukkan Text"}
                  required={true}
                  className="w-[400px]"
                  rows={4}
                  onChange={() => console.log("Text Input Required")}
                />
                <TextArea
                  label="TextArea Border Success"
                  placeholder={"Masukkan Text"}
                  className="w-[400px]"
                  rows={4}
                  border={"success"}
                  onChange={() => console.log("Text Input")}
                />
              </div>
              <div className="flex w-[1000px] gap-2 mt-2">
                <TextArea
                  label="TextArea Disabled"
                  type="text"
                  placeholder={"Masukkan Text"}
                  isDisabled={true}
                  className="w-[400px]"
                  rows={4}
                  onChange={() => console.log("Text Input Disabled")}
                />
              </div>
            </section>
            <section>
              <div className="card-body">
                <div className="flex flex-col">
                  <div className="flex items-start relative">
                    <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300"></div>
                    <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                      <i className="ki-outline ki-people text-base"></i>
                    </div>
                    <div className="ps-2.5 mb-7 text-md grow">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-800">
                          Posted a new article
                          <a
                            className="text-sm font-medium link"
                            href="/metronic/tailwind/demo1/public-profile/profiles/blogger"
                          >
                            Top 10 Tech Trends
                          </a>
                        </div>
                        <span className="text-xs text-gray-600">
                          Today, 9:00 AM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start relative">
                    <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300"></div>
                    <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                      <i className="ki-outline ki-entrance-left text-base"></i>
                    </div>
                    <div className="ps-2.5 mb-7 text-md grow">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-800">
                          I had the privilege of interviewing an industry expert
                          for an
                          <a
                            className="text-sm link"
                            href="/metronic/tailwind/demo1/public-profile/profiles/blogger"
                          >
                            upcoming blog post
                          </a>
                        </div>
                        <span className="text-xs text-gray-600">
                          2 days ago, 4:07 PM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start relative">
                    <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                      <i className="ki-outline ki-cup text-base"></i>
                    </div>
                    <div className="ps-2.5 text-md grow">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-800">
                          We recently&nbsp;
                          <a
                            className="text-sm font-medium link"
                            href="/metronic/tailwind/demo1/public-profile/profiles/nft"
                          >
                            celebrated
                          </a>
                          &nbsp;the blog's 1-year anniversary
                        </div>
                        <span className="text-xs text-gray-600">
                          3 months ago, 4:07 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
