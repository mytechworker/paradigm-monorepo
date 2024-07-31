import type { FormItemProps, InputProps, UploadProps } from 'antd';

export interface InputFCProps extends InputProps {
  name: string;
  className?: string;
  label?: string;
  lblClassName?: string;
  rules?: FormItemProps['rules'];
  defaultFileList?: UploadProps['defaultFileList'];
  initialValue?: FormItemProps['initialValue'];
}
