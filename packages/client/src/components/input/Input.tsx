import React from 'react';
import { Form, Input, Upload, Button, Dropdown, Select } from 'antd';
import { Upload as UploadOutlined } from 'react-feather';
import type { FormItemProps, InputProps, UploadProps, DropDownProps, SelectProps } from 'antd';

import { InputFCProps } from '@client/types/formItems.types';

const FormItem = Form.Item;

const fieldLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};

const TextArea = Input.TextArea;
const Password = Input.Password;
const Option = Select.Option;

// const InputFC: React.FC<InputFCProps> = ({ name, className, lblClassName, multiple, initialValue, ...rest }) => {
//   const { label, rules, type } = rest;

//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   if (type === 'file') {
//     return (
//       <FormItem
//         name={name}
//         label={label}
//         className={lblClassName}
//         rules={rules}
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         initialValue={initialValue}
//         {...fieldLayout}
//       >
//         <Upload
//           name={name}
//           action="/api/noop"
//           listType="picture"
//           accept=".png,.jpeg,.jpg,.svg"
//           multiple={multiple ?? false}
//           maxCount={1}
//         >
//           <Button icon={<UploadOutlined />}>Click to upload</Button>
//         </Upload>
//       </FormItem>
//     );
//   }

//   if (type === 'textarea') {
//     return (
//       <FormItem name={name} label={label} className={lblClassName} rules={rules} {...fieldLayout}>
//         <TextArea name={name} className={className} />
//       </FormItem>
//     );
//   }

//   return (
//     <FormItem name={name} label={label} className={lblClassName} rules={rules} {...fieldLayout}>
//       <Input name={name} className={className} type={type} {...rest} />
//     </FormItem>
//   );
// };

// export default InputFC;

type InputType = 'text' | 'textarea' | 'password' | 'dropdown' | 'select' | 'file';

type InputComponentPropsTypes = {
  componentType?: InputType;
  label?: string;
  name: string;
  placeholder?: string;
  rules?: FormItemProps['rules'];
  selectOptions?: string[];
  formItemProps?: FormItemProps;
  inputProps?: InputProps;
  uploadProps?: UploadProps;
  dropdownProps?: DropDownProps;
  selectProps?: SelectProps;
  onChange?: (e: any) => void;
};

const InputComponent: React.FC<InputComponentPropsTypes> = ({
  componentType = 'text',
  label = undefined,
  name,
  rules,
  selectOptions,
  children,
  ...rest
}) => {
  const { formItemProps, inputProps, uploadProps, dropdownProps, selectProps } = rest;

  // const InputComponent = {
  //   text: <Input {...inputProps} {...rest} />,
  //   textarea: <TextArea {...rest} />,
  //   password: <Password {...inputProps} {...rest} />,
  //   file: (
  //     <Upload
  //       listType={uploadProps?.listType ?? 'picture'}
  //       multiple={uploadProps?.multiple ?? false}
  //       maxCount={uploadProps?.maxCount ?? 1}
  //       {...uploadProps}
  //       {...rest}
  //     >
  //       <Button icon={<UploadOutlined />}>Click to upload</Button>
  //     </Upload>
  //   ),
  //   dropdown: <Dropdown {...dropdownProps} {...rest}></Dropdown>,
  //   select: selectOptions && (
  //     <Select mode="multiple" {...selectProps}>
  //       {selectOptions.map((option, index) => {
  //         return (
  //           <Option key={index} value={option}>
  //             {option}
  //           </Option>
  //         );
  //       })}
  //     </Select>
  //   ),
  // };

  const InputComponentMap = {
    text: <Input {...inputProps} {...rest} />,
    textarea: <TextArea {...(rest as unknown as any)} {...inputProps} />,
    password: <Password {...inputProps} {...rest} />,
    file: (
      <Upload listType="picture" maxCount={1} {...uploadProps} {...rest}>
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    ),
    select: selectOptions && (
      <Select {...selectProps}>
        {selectOptions.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    ),
  };

  return (
    <FormItem name={name} label={label} rules={rules} {...fieldLayout} {...formItemProps}>
      {InputComponentMap[componentType]}
    </FormItem>
  );
};

export default InputComponent;
