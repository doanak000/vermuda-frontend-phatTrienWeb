import React, { useState } from 'react'
import {
  TableEvent,
  WrapperEvent,
  WrapperIconEvent,
  WrapperRenderEvent
} from './EventCode.style'
import { Input, InputNumber, Popconfirm, Form } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  ButtonDelete,
  ButtonEdit
} from '../../components/InputCustom/ButtonCustom'
const originData = []
for (let i = 0; i < 80; i++) {
  originData.push({
    key: i.toString(),
    seri: i + 1,
    store: `Edrward ${i}`,
    genNumber: i + 1,
    dateCreate: '1-1-2021',
    color: 'red',
    description: 'this event is ...',
    exchangeRate: i
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
      store: '',
      genNumber: '',
      dateCreate: '',
      color: '',
      description: '',
      exchangeRate: '',
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
      title: 'Store',
      dataIndex: 'store',
      width: '20%',
      editable: false
    },
    {
      title: 'Gen',
      dataIndex: 'genNumber',
      width: '5%',
      editable: true
    },
    {
      title: 'Date Create',
      dataIndex: 'dateCreate',
      width: '15%',
      editable: false
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width: '5%',
      editable: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
      editable: true
    },
    {
      title: 'Exchange',
      dataIndex: 'exchangeRate',
      width: '5%',
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
          <WrapperIconEvent>
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
          </WrapperIconEvent>
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
          col.dataIndex === ('seri' || 'genNumber' || 'exchangeRate')
            ? 'number'
            : col.dataIndex === 'dateCreate'
            ? 'date'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  return (
    <Form form={form} component={false}>
      <TableEvent
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
const Event = () => {
  return (
    <WrapperEvent>
      <WrapperRenderEvent>
        <EditableTable />
      </WrapperRenderEvent>
    </WrapperEvent>
  )
}
export default Event
