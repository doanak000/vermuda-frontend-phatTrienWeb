import React, { useEffect, useState } from 'react'
import {
  TableListOfCode,
  WrapperListOfCode,
  WrapperIconListOfCode,
  WrapperRenderListOfCode,
  ListOfCodeModal
} from './ListOfCode.style'
import { Popconfirm, Form, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  selectInfoCode,
  selectListOfCode,
  saveAllListOfCode
} from '../generateCode/generateCodeSliceQR'
import { useDispatch, useSelector } from 'react-redux'
import { EditableCell } from '../../helper/editTableCell'
import ExportPdf from './ExportPdf.js'
import {
  ButtonDelete,
  ButtonEdit
} from '../../components/InputCustom/ButtonCustom'

const EditableTable = (props) => {
  const keyIndex = props.keyIndex
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const listOfCode = useSelector(selectListOfCode)

  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const originData = listOfCode[keyIndex]?.map((item) => ({ ...item }))

  useEffect(() => {
    setData(originData)
  }, [keyIndex])
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      seri: '',
      randomCode: '',
      name: '',
      date: '',
      status: '',
      ...record
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const handleDelete = (key) => {
    const newData = [...data]
    // const indexDelete = newData.findIndex((item) => item.key === key)

    setData(newData.filter((item) => item.key !== key))
    dispatch(
      saveAllListOfCode({
        listOfCodeItem: newData.filter((item) => item.key !== key),
        keyIndex: keyIndex
        // seriDelete: newData[indexDelete].seri
      })
    )
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
        dispatch(
          saveAllListOfCode({
            listOfCodeItem: newData,
            keyIndex: keyIndex
          })
        )
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
      title: 'randomCode',
      dataIndex: 'randomCode',
      width: '20%',
      editable: false
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      editable: true
    },
    {
      title: 'date',
      dataIndex: 'date',
      width: '20%',
      editable: true
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '20%',
      editable: true
    },
    {
      title: 'operation',
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
          <WrapperIconListOfCode>
            <ButtonEdit
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </ButtonEdit>
            <ButtonDelete
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </ButtonDelete>
            {/* <Typography.Link> </Typography.Link> */}
          </WrapperIconListOfCode>
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
            : col.dataIndex === 'status'
            ? 'select'
            : col.dataIndex === 'date'
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
      <TableListOfCode
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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}></div>
    </Form>
  )
}
const TableGenerateCode = () => {
  const [form] = Form.useForm()
  const infoCode = useSelector(selectInfoCode)
  const originData = []
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = (i) => {
    setKeyIndex(i)
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [keyIndex, setKeyIndex] = useState()
  for (let i = 0; i < infoCode?.code?.length; i++) {
    originData.push({
      key: originData.length,
      seri: originData.length + 1,
      name: infoCode?.code[i]?.name,
      number: infoCode?.code[i]?.number,
      operation: (
        <>
          <Button onClick={() => showModal(i)}>Click For Detail</Button>
        </>
      )
    })
  }
  if (infoCode?.code?.length % 10 !== 0) {
    for (let i = 0; i < 10 - (infoCode?.code?.length % 10); i++) {
      originData.push({
        key: originData.length,
        seri: originData.length + 1
      })
    }
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'seri',
      width: '10%'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '40%'
    },
    {
      title: 'Number',
      dataIndex: 'number',
      width: '30%'
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '20%'
    }
  ]
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title
      })
    }
  })
  return (
    <Form form={form} component={false}>
      <TableListOfCode
        components={{
          body: {}
        }}
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          showSizeChanger: false
        }}
      ></TableListOfCode>
      <ListOfCodeModal
        title='Detail'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <EditableTable keyIndex={keyIndex} handleCancel={handleCancel} />
      </ListOfCodeModal>
      <ExportPdf></ExportPdf>
    </Form>
  )
}
const ListOfCode = () => {
  return (
    <WrapperListOfCode>
      <WrapperRenderListOfCode>
        <TableGenerateCode></TableGenerateCode>
      </WrapperRenderListOfCode>
    </WrapperListOfCode>
  )
}
export default ListOfCode
