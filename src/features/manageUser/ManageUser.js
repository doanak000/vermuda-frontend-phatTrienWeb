import React, { useState } from 'react'
import {
  TableManageUser,
  WrapperManageUser,
  WrapperIconManageUser,
  WrapperRenderManageUser
} from './ManageUser.style'
import { Input, InputNumber, Popconfirm, Form, Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Option } from 'antd/lib/mentions'
import {
  ButtonDelete,
  ButtonEdit
} from '../../components/InputCustom/ButtonCustom'
const originData = []
for (let i = 0; i < 80; i++) {
  originData.push({
    key: i.toString(),
    seri: i + 1,
    userID: `Edrward ${i}`,
    company: `company ${i}`,
    email: 'doanak@gmail.com',
    ruleSpin: 'Can Spin'
  })
}
const EditableCell = ({
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
      <Select defaultValue='Can Spin'>
        <Option value='' selected disabled hidden>
          Choose Spin rule
        </Option>
        <Option value='Can Spin'>Can Spin</Option>
        <Option value='Can not Spin'>Can not Spin</Option>
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

const EditableTable = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      seri: '',
      userID: '',
      company: '',
      email: '',
      ruleSpin: '',
      ...record
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'seri',
      width: '5%',
      editable: false
    },
    {
      title: 'User ID',
      dataIndex: 'userID',
      width: '20%',
      editable: false
    },
    {
      title: 'Company',
      dataIndex: 'company',
      width: '25%',
      editable: false
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '20%',
      editable: true
    },
    {
      title: 'Rule Spin',
      dataIndex: 'ruleSpin',
      width: '15%',
      editable: true
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: function renderEdit(_, record) {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href='javascript:;'
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </a>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <WrapperIconManageUser>
            <ButtonEdit
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <EditOutlined
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: '0'
                }}
              />
            </ButtonEdit>
            <ButtonDelete title='Sure to delete?'>
              <DeleteOutlined
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </ButtonDelete>
          </WrapperIconManageUser>
        )
      }
    }
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'seri'
            ? 'number'
            : col.dataIndex === 'ruleSpin'
            ? 'select'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  return (
    <Form form={form} component={false}>
      <TableManageUser
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
          showSizeChanger: false
        }}
      />
    </Form>
  )
}
const ManageUser = () => {
  return (
    <WrapperManageUser>
      <WrapperRenderManageUser>
        <EditableTable />
      </WrapperRenderManageUser>
    </WrapperManageUser>
  )
}
export default ManageUser
