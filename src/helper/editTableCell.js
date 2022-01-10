import React from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
const { Option } = Select
export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber />
    ) : inputType === 'date' ? (
      <Input type='date' />
    ) : inputType === 'select' ? (
      <Select>
        <Option value='Valid'>Valid</Option>
        <Option value='InValid'>InValid</Option>
      </Select>
    ) : (
      <Input />
    )
  return (
    <td {...restProps} style={{ padding: '20px auto', fontSize: '15px' }}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
